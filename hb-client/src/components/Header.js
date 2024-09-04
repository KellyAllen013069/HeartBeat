import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HBHeartLogo from "../images/HBHeartLogo.png";
import SpanishLogo from "../images/spanish.png";
import './Header.css';
import { useUser } from '../contexts/UserContext';

const Header = () => {
    const { user, handleSignOut } = useUser();
    console.log("USER IS ", user);

    return (
        <header className="header">
            <div className="left-section">
                <img src={SpanishLogo} alt="Espanol" style={{ width: '90px', height: '90px' }} />
            </div>
            <div className="center-section">
                <span className="logo-text logo-left">HeartBeat</span>
                <img src={HBHeartLogo} alt="Heartbeat Dance Company Logo" className="logo-image" />
                <span className="logo-text logo-right">Dance Company</span>
            </div>
            <div className="right-section">
                <nav className="nav-links">
                    <ul>
                        {user ? (
                            <>
                                <li><a href="/admin">Admin</a></li>
                                <li>{user.signInDetails.loginId}</li> {/* Display user username */}
                                <li>
                                    <ShoppingCartIcon style={{ color: 'red' }} />
                                </li>
                                <li><a href="/" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>Sign Out</a></li>
                            </>
                        ) : (
                            <li><a href="/login">Login/Register</a></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
