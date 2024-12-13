import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableSelection = ({ date, timeSlot, onNext, onPrevious }) => {
    const [guests, setGuests] = useState(0); // State for the number of guests
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [step, setStep] = useState(1); // To manage the input and table selection steps

    useEffect(() => {
        if (guests > 0) {
            axios
                .get(`/reservations/available-tables?date=${date}&timeSlot=${timeSlot}&guests=${guests}`)
                .then(response => setTables(response.data))
                .catch(error => console.log(error));
        }
    }, [date, timeSlot, guests]);

    const handleGuestSubmit = () => {
        if(guests && guests > 0){
            setStep(2); // Proceed to the table selection step
        }else{
            alert("Please enter a valid number of guests.");
        }
    }

    const handleTableSelect = (table) => {
        setSelectedTable(table);
    }

    const handleNext = () => {
        onNext({ guests, table: selectedTable });
    }

    return(
        <div>
            {step === 1 && (
                <div className='guestSelection'>
                    <h1 >Enter Number of Guests</h1>
                    <input 
                        type='number'
                        value={guests || ''}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        placeholder='Number of guests'
                        id='guestNumber'
                    />
                    <button className='dataSubmit' onClick={handleGuestSubmit}>NEXT</button>
                </div>
            )}
            {step === 2 && (
                <div className='tableSelection'>
                    <h1 >Select a Table</h1>
                    <div>
                        {
                            tables.length > 0 ? (
                                tables.map(table => (
                                    <button
                                        key={table.tableNumber}
                                        onClick={() => handleTableSelect(table._id)}
                                        id='tablePickButton'
                                        className={selectedTable === table._id ? 'selected' : ''}
                                    >
                                        Table {table.tableNumber} - Seats {table.seats}
                                    </button>
                                ))
                            ) : (<p>No tables available for the selected number of guests.</p>)
                        }
                    </div>
                    {/* <button onClick={() => setStep(1)}>PREVIOUS</button> */}
                    <button className='dataSubmit' onClick={handleNext} disabled={!selectedTable}>NEXT</button>
                </div>
            )}
        </div>
    );
};

export default TableSelection;

{/* <div>
    <h1>Select a Table</h1>
        <div>
            {
                tables.map(table => (
                    <button key={table.tableNumber} onClick={() => handleTableSelect(table._id)}>
                        Table {table.tableNumber} - Seats {table.seats}
                    </button>
                ))
            }
        </div>
        <button onClick={onPrevious}>PREVIOUS</button>
        <button onClick={handleNext} disabled={!selectedTable}>NEXT</button>
</div> */}