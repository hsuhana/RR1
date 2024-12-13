const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
    time: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);