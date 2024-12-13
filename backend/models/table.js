const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: {type: String, unique: true, required: true},
    seats: {type: Number, required: true},
    isActive: {type: Boolean, default: true},
});

module.exports = mongoose.model("Table", tableSchema);