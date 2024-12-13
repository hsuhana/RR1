import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthStatus = () => {
    const { isAuthenticated, username, isLoading, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate('/');
    }

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while checking authentication
    }

    return (
        <div >
            {isAuthenticated ? (
                <>
                    <div className='userStatus'>
                        <p>Welcome, <strong>{username}</strong>&nbsp;&nbsp;</p>
                        <button onClick={() => navigate('/members')}>Member</button>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </>
            ) : (
                <div className='userStatus'>
                    <p>Welcome, Visitor</p>
                </div>
            )}
        </div>
    );
};

export default AuthStatus;
