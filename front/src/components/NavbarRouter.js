import React, { useContext } from 'react';
//<Router> enables the entire routing context, while <Link> simply triggers a change in the URL when clicked.
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// import Home from '../pages/Home';
// import Register from '../pages/Register';
// import Menu from '../pages/Menu';
// import Login from '../pages/Login';
// import Reservation from '../pages/Reservation';
import AuthStatus from './AuthStatus';
// import Members from '../pages/Member';

const NavbarRouter = () => {

    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRestrictedNavigation = (path) => {
        if(isAuthenticated){
            alert('Please log out first to access this page.');
            navigate('/');
        }else{
            navigate(path);
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><button onClick={() => {handleRestrictedNavigation('/register')}}>Register</button></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><button onClick={() => {handleRestrictedNavigation('/login')}}>Login</button></li>
                    <li><Link to="/reservation">Reservation</Link></li>
                </ul>
                <AuthStatus />
            </nav>
{/* 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/members" element={<Members />} />
            </Routes> */}
        </>
    );
};

export default NavbarRouter;
