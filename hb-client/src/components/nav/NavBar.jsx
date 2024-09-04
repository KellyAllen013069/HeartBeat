import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/group-classes">Group Classes</Link></li>
                <li><Link to="/dance-teams">Dance Teams</Link></li>
                <li><Link to="/private-lessons">Private Lessons</Link></li>
                <li><Link to="/personal-fitness-coaching">Personal Fitness</Link></li>
                <li><Link to="/festival-performers">Festival Performers</Link></li>
                <li><Link to="/party-entertainment">Party Entertainment</Link></li>
                <li><Link to="/wedding-choreographies">Wedding Choreographies</Link></li>
                <li><Link to="/quincenera-dances">Quincenera Dances</Link></li>
                <li><Link to="/master-classes">Master Classes</Link></li>
                <li><Link to="/costume-design">Costume Design</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
