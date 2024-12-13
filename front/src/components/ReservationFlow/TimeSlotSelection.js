import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeSlotSelection = ({ date, onNext, onPrevious }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    useEffect(() => {
        axios.get(`/reservations/available-time-slots?date=${date}`)
        .then(response => setTimeSlots(response.data))
        .catch(error => console.log(error));
    }, [date]);

    const handleTimeSlotSelect = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleNext = () => {
        onNext(selectedTimeSlot);
    }

    return(
        <div className='timeSelection'>
            <h1>Select a Time Slot</h1>
            <div>
                {
                    timeSlots.map(ts => (
                        <button key={ts.time} className={`timePickButton ${selectedTimeSlot === ts.time ? 'selected' : ''}`} onClick={() => handleTimeSlotSelect(ts.time)}>
                            {ts.time}
                        </button>
                    ))
                }
            </div>
            {/* <button  onClick={onPrevious}>PREVIOUS</button> */}
            <button className='dataSubmit' onClick={handleNext} disabled={!selectedTimeSlot}>NEXT</button>
        </div>
    );
};

export default TimeSlotSelection;