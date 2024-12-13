import React, { useState, useEffect } from "react";
import axios from "axios";

const Member = () => {
    const [memberData, setMemberData] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get("/members/profile", {
                    withCredentials: true,
                });
                setMemberData(response.data.member);
                setReservations(response.data.reservations);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching member data.");
            }
        };

        fetchMemberData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setFormData(memberData); // Pre-fill form with existing data
        setEditMode(!editMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.patch("/members/profile", formData, { withCredentials: true, });
            setMemberData(response.data.member); // Update the displayed data
            setEditMode(false); // Exit edit mode
        }catch(err){
            setError(err.response?.data?.message || "Error updating profile.");
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try{
            await axios.delete(`/reservations/${reservationId}`, { withCredentials: true });
            setReservations((prev) => prev.filter((res) => res._id !== reservationId));
        }catch (err){
            setError(err.response?.data?.message || "Error canceling reservation.");
        }
    };

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!memberData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="memberSection">
            <h1 className="memberTitle" >Member Profile</h1>
            {editMode ? (
           　<div className="body">

                <form className="profile-edit-container" onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Birthday:
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday?.substring(0, 10)} // Format date for input
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <button class="btnSave" type="submit">Save</button>
                    <button class="btnChange" type="button" onClick={handleEditToggle}>
                        Cancel
                    </button>
                </form>
                </div>
            ) : (
                <div className="body">
                <div className="details-box">
                    <h2 class="profile-title">Details:</h2>
                    <div class="profile-details">
                    <p className="labelDetails"><strong>Username:</strong><p className="input"> {memberData.username}</p></p>
                    <p className="labelDetails"><strong>Name:</strong> <p className="input"> {memberData.firstName} {memberData.lastName}</p></p>
                    <p className="labelDetails"><strong>Email:</strong> <p className="input"> {memberData.email}</p></p>
                    <p className="labelDetails"><strong>Phone:</strong> <p className="input"> {memberData.phoneNumber}</p></p>
                    <p className="labelDetails"><strong>Birthday:</strong> <p className="input"> {new Date(memberData.birthday).toLocaleDateString()}</p></p>
                    <button class="btnEdit" onClick={handleEditToggle}>EDIT</button>
                </div>
                </div>
                </div>
                
            )}
            </div>
            <div className="reservation_background">
            <h2 className="reservationTitle">Your Reservations:</h2>
            {reservations.length > 0 ? (
                    <section className="body_reservation">
                    <table className="reservationTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Table</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr className="reservation_detail" key={reservation._id}>
                                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                <td>{reservation.timeSlot}</td>
                                <td>{reservation.guests}</td>
                                <td>{reservation.tableId ? reservation.tableId.tableNumber : "N/A"}</td>
                                <td>
                                    <button
                                        className="btnCancel"
                                        onClick={() => handleCancelReservation(reservation._id)}
                                    >
                                        CANCEL
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </section>
                
            ) : (
                <p>No reservations found.</p>
            )}</div>
        </div>
    );
};

export default Member;