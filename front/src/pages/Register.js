import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        birthday: "",
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/register', formData);
            alert(response.data.message);
            navigate("/login");
        }catch (error) {
            alert(`Error: ${error.response.data.error}`);
        }
    };

    return (
        <div className="register-page">

            <div className="register-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required/>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required/>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                    <input type="date" name="birthday" onChange={handleChange} required/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;