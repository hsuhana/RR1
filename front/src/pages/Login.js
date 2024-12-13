import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext); // Access the login function
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(formData.username, formData.password); // Call login function
            alert("Login successful!");
            navigate("/");
        } catch (errorMessage) {
            setError(errorMessage);
        }
    };

    return(
        <div className="loginPage">
            <div className="register-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                    <button type="submit">Log In</button>
                </form>
                {error && <p style={{color: "red"}}>{error}</p>}
            </div>
        </div>
    );
};


export default Login;