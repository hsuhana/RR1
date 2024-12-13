const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String
        //don't put "required" if using passport-local-mongoose 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    birthday: {
        type: Date,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

memberSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Member", memberSchema);