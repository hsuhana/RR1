import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../components/useAuth";
import DateSelection from "../components/ReservationFlow/DateSelection";
import TimeSlotSelection from "../components/ReservationFlow/TimeSlotSelection";
import TableSelection from "../components/ReservationFlow/TableSelection";
import SpecialRequests from "../components/ReservationFlow/SpecialRequests";
import ProgressBar from "../components/ProgressBar";

const Reservation = () => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [guests, setGuests] = useState(0);
    const [table, setTable] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    //const [isCheckingAuth, setIsCheckingAuth] = useState(true);


    const { isAuthenticated, isLoading } = useAuth(); // Use updated hook
    const navigate = useNavigate();

    // Ensure the user is redirected only if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login'); // Redirect if not authenticated
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return <div>Loading...</div>; // Show a loading screen while checking authentication


    const handleNext = (data) => {
        switch (step){
            case 1:
                setDate(data);
                break;
            case 2:
                setTimeSlot(data);
                break;
            case 3:
                setGuests(data.guests);
                setTable(data.table);
                break;
            case 4:
                setSpecialRequests(data);
                break;
            // case 5:
            //     setSpecialRequests(data);
            //     break;
            default:
                break;
        }
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    return(
        <div className="reservationPage">
            <ProgressBar step={step} />
            {step === 1 && <DateSelection onNext={handleNext} />}
            {step === 2 && <TimeSlotSelection date={date} onNext={handleNext} onPrevious={handlePrevious}/>}
            {step === 3 && <TableSelection date={date} timeSlot={timeSlot} onNext={handleNext} onPrevious={handlePrevious}/>}
            {step === 4 && <SpecialRequests date={date} timeSlot={timeSlot} guests={guests} table={table} onPrevious={handlePrevious} />}
        </div>
    );
};

export default Reservation;