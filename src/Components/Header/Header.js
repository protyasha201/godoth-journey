import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './Header.css';

const Header = () => {
    let history = useHistory();
    const handleLogin = () => {
        history.push(`/login`);
    }
    return (
        <div>
            <nav className="navbar">
                <h1>Godoth Journey</h1>
                <div className="navOptions">
                    <Link className="navLinks" to="/">Home</Link>
                    <Link className="navLinks" to="/">Destination</Link>
                    <Link className="navLinks" to="/">Blog</Link>
                    <Link className="navLinks" to="/login">Contact</Link>
                    <Link className="navLinks" to="/signup">Sign Up</Link>
                    <button onClick={handleLogin} className="loginBtn">Login</button>
                </div>
            </nav>
            <hr className="horizontalLine"/>
        </div>
    );
};

export default Header;