// for hardcoding timeslot to mongodb, one time only
// node seedTimeSlot
const mongoose = require('mongoose');
const TimeSlot = require('./models/timeSlot.js');
require('./app.js');

// List of fixed time slots
const timeSlots = [
  '12:00 PM', '04:00 PM', '08:00 PM',
];

const seedTimeSlots = async () => {
    try{
        //await TimeSlot.deleteMany(); // Optional: Clear existing time slots
        const existingSlots = await TimeSlot.find({});
        if(existingSlots.length === 0){
            const slotPromises = timeSlots.map(time => new TimeSlot({time}).save());
            await Promise.all(slotPromises);
            console.log('Time slots seeded successfully!');
        }else{
            console.log('Time slots already exist. No action taken.');
        }
        
    }catch(error){
        console.error('Error seeding time slots:', err);
        
    }finally {
        mongoose.connection.close();
    }
}

// Run the seeding function
seedTimeSlots();