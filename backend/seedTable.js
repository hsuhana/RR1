// for hardcoding table to mongodb, one time only
// node seedTable
const mongoose = require('mongoose');
const Table = require('./models/table.js');
require('./app.js');

// Define the table information
const tables = [
    { tableNumber: 1, seats: 2 },
    { tableNumber: 2, seats: 4 },
    { tableNumber: 3, seats: 4 },
    { tableNumber: 4, seats: 6 },
    { tableNumber: 5, seats: 6 },
    { tableNumber: 6, seats: 8 },
];

// Seed the database
const seedTables = async () => {
    try {
        //await Table.deleteMany(); // Optional: Clear existing tables
        const existingTables = await Table.find({}); // Fetch existing tables
        const existingTableNumbers = existingTables.map(table => table.tableNumber); // Extract table numbers
  
        // Filter out tables that already exist
        const newTables = tables.filter(
        table => !existingTableNumbers.includes(table.tableNumber)
      );
  
      if (newTables.length > 0) {
        await Table.insertMany(newTables);
        console.log('New tables added successfully:', newTables);
      } else {
        console.log('No new tables to add. All tables are up to date.');
      }
    } catch (err) {
      console.error('Error seeding tables:', err);
    } finally {
      mongoose.connection.close();
    }
};
  
// Run the seeding function
seedTables();