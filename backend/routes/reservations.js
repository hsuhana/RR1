var express = require('express');
var router = express.Router();
const moment = require('moment');
var Reservation = require('../models/reservation');
var Table = require('../models/table');
const TimeSlot = require('../models/timeSlot');
var passport = require('passport');
const { isAuthenticated } = require('../utils/auth');

// GET /available-dates
// Route to fetch available dates (those with available time slots and tables)
router.get('/available-dates', async (req, res) => {
    const currentDate = moment();
    const next14Days = moment().add(14, 'days');
    const availableDates = [];

    // Check availability for the next 14 days
    for(let date = currentDate; date.isBefore(next14Days); date.add(1, 'day')){
        const timeSlots = await TimeSlot.find({ isAvailable: true });
        const tables = await Table.find({ isActive: true });

        const reservations = await Reservation.find({
            date: date.toDate(),
            timeSlot: { $in: timeSlots.map(ts => ts.time) }
        });

        const unavailableTables = reservations.map(res => res.tableId);
        const availableTables = tables.filter(table => !unavailableTables.includes(table._id));

        if(timeSlots.length && availableTables.length){
            availableDates.push(date.format('YYYY-MM-DD'));
        }
    }
    res.json(availableDates);
});

// GET /available-time-slots
// Route to fetch available time slots and tables based on a selected date
router.get('/available-time-slots', async (req, res) => {
    const { date } = req.query;
    const timeSlots = await TimeSlot.find({ isAvailable: true });
    const reservations = await Reservation.find({ date: new Date(date) });
    const availableTimeSlots = timeSlots.filter(ts => !reservations.some(res => res.timeSlot === ts.time));

    res.json(availableTimeSlots);
});

// GET /available-tables
router.get('/available-tables', async (req, res) => {
    const { date, timeSlot, guests } = req.query;
    const tables = await Table.find({ seats: { $gte: guests }, isActive: true });
    const reservations = await Reservation.find({ date: new Date(date), timeSlot });
    const unavailableTables = reservations.map(res => res.tableId);
    const availableTables = tables.filter(table => !unavailableTables.includes(table._id));

    res.json(availableTables);
});

// GET /tables/:id
router.get('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).send({ error: 'Table not found' });
        }
        res.send(table);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch table details' });
    }
});

// POST /reserve
router.post('/reserve', isAuthenticated, async (req, res) => {
    try {
        const { date, timeSlot, tableId, guests, specialRequests } = req.body;

        // Log the request body to check if all data is being received correctly
        console.log('Request Data:', req.body);

        const member = req.user;

        // Check if the member is available
        if (!member) {
            return res.status(400).json({ error: 'User is not authenticated' });
        }

        // Save reservation to database
        const newReservation = new Reservation({
            member: member._id,
            tableId,
            date: new Date(date),
            timeSlot,
            guests,
            specialRequests,
        });

        await newReservation.save();
        res.status(201).json({ message: 'Reservation successful!', reservation: newReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /:id
router.delete('/:id', isAuthenticated, async(req, res) => {
    try{
        const reservationId = req.params.id;

        const reservation = await Reservation.findOne({
            _id: reservationId,
            member: req.user._id,
        });

        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found or not authorized to cancel." });
        }

        await Reservation.deleteOne({ _id: reservationId });
        res.status(200).json({ message: "Reservation canceled successfully." });
    } catch (error){
        console.error("Error canceling reservation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;