import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <div className = "navbar">
                <ul className = "navbarList">
                    <li className = "navbarItem">
                        <Link to = "/" className = "navbarLink"> APOLLO </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;