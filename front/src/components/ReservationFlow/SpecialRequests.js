import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpecialRequests = ({ date, timeSlot, table, guests, onPrevious }) => {
    const [specialRequests, setSpecialRequests] = useState('');
    const [reservationInfo, setReservationInfo] = useState(null); // To store reservation details
    const [tableNumber, setTableNumber] = useState(''); // To store table number
    const navigate = useNavigate();

    // Fetch the table number based on the table ID
    useEffect(() => {
        if (table) {
            axios
                .get(`/reservations/tables/${table}`) // Assuming an endpoint exists to fetch a table by its ID
                .then(response => {
                    console.log('Table Response:', response.data);
                    setTableNumber(response.data.tableNumber)

                })
                .catch(error => console.error('Error fetching table number:', error));
        }
    }, [table]);

    const handleReserve = async () => {
        try{
            const response = await axios.post('/reservations/reserve', {
                date,
                timeSlot,
                guests,
                tableId: table,
                specialRequests,
            });

            // Store reservation information and display success message
            setReservationInfo({
                date,
                timeSlot,
                guests,
                tableNumber,
                specialRequests,
                message: response.data.message,
            });

            // Redirect to home after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 6000);

        } catch (error){
            console.error(error);
            alert('Reservation failed. Please try again.');
        }
    };

    if (reservationInfo) {
        // Display reservation info and success message
        return (
            <div className='reservationConfirm'>
                <h1>{reservationInfo.message}</h1>
                <p><strong>Date:</strong> {reservationInfo.date}</p>
                <p><strong>Time Slot:</strong> {reservationInfo.timeSlot}</p>
                <p><strong>Guests:</strong> {reservationInfo.guests}</p>
                <p><strong>Table:</strong> {reservationInfo.tableNumber}</p>
                <p><strong>Special Requests:</strong> {reservationInfo.specialRequests}</p>
                <p>Redirecting to home page...</p>
            </div>
        );
    }

    return(
        <div className='dateSelection'>
            <h1>Special Requests</h1>
            <textarea 
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder='Enter any special requests'
                className='textArea'
                rows="6" cols="40"
            />
            {/* <button onClick={onPrevious}>PREVIOUS</button> */}
            <button className='dataSubmit' onClick={handleReserve}>RESERVE</button>
        </div>
    );
};

export default SpecialRequests;