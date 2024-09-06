import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HBHeartLogo from '../images/HBHeartLogo.png';
import SpanishLogo from '../images/spanish.png';
import EnglishLogo from '../images/english.png';
import './Header.css';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext'; // Import useCart

const Header = ({ toggleCart }) => {
    const { user, handleSignOut } = useUser();
    const { i18n, t } = useTranslation();
    const [language, setLanguage] = useState('en'); // Default language is English
    const { cartItemCount } = useCart(); // Retrieve cartItemCount here

    const handleLanguageToggle = () => {
        const newLang = language === 'en' ? 'es' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="header">
            <div className="left-section">
                <img
                    src={language === 'en' ? SpanishLogo : EnglishLogo}
                    alt={language === 'en' ? 'Español' : 'English'}
                    style={{ width: '90px', height: '90px', cursor: 'pointer' }}
                    onClick={handleLanguageToggle}
                />
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
                                <li><a href="/admin">{t('Admin')}</a></li>
                                <li>{user.signInDetails.loginId}</li>
                                <li style={{ position: 'relative' }}>
                                    <ShoppingCartIcon
                                        style={{ color: 'red', cursor: 'pointer' }}
                                        onClick={toggleCart}
                                    />
                                    {cartItemCount > 0 && (
                                        <span className="cart-badge">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </li>
                                <li>
                                    <a href="/" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>
                                        {t('sign_out')}
                                    </a>
                                </li>
                            </>
                        ) : (
                            <li><a href="/login">{t('login')}</a></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
