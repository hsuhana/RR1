import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DateSelection = ({ onNext }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        axios.get('/reservations/available-dates')
        .then(response => {
            console.log('Available Dates:', response.data);
            setAvailableDates(response.data);})
        .catch(error => console.log(error));
         
    }, []);


    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleNext = () => {
        onNext(selectedDate);
    };

    return(
        <div className='dateSelection'>
            <h1>Select a Date</h1>
            <div>
                {
                    availableDates.map(date => (
                        <button className={`datePickButton ${selectedDate === date ? 'selected' : ''}`} key={date} onClick={() => handleDateSelect(date)}>
                            {date}
                        </button>
                    ))
                }
            </div>
            <button className='dataSubmit' onClick={handleNext} disabled={!selectedDate}>NEXT</button>
        </div>
    );
};

export default DateSelection;