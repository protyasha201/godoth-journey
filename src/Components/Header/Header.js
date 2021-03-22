import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    let history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const handleLogin = () => {
        history.push(`/signup`);
    }
    
    return (
        <div>
            <nav className="navbar">
                <h1>Godoth Journey</h1>
                <div className="navOptions">
                    <Link className="navLinks" to="/">Home</Link>
                    <Link className="navLinks" to="/">Destination</Link>
                    <Link className="navLinks" to="/">Contact</Link>
                    <Link className="navLinks" to="/">Blog</Link>
                    {
                        user.isSignedIn ? <Link style={{cursor: 'pointer'}}className="navLinks" to="/signup">{user.name}</Link>
                        :
                        <button onClick={handleLogin} className="loginBtn">Login</button>
                    }
                </div>
            </nav>
            <hr className="horizontalLine" />
        </div>
    );
};

export default Header;