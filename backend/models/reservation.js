const mongoose = require("mongoose");
const member = require("./member");

const reservationSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        
    },
    specialRequests: {
        type: String,
        trim: true
    },
});

//reservationSchema.index({tableId: 1, date: 1, timeSlot: 1}, {unique: true});
module.exports = mongoose.model("Reservation", reservationSchema);