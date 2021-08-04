import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import logo from './logos/APOLLO_LOGO.png'
import LoginButton from './LoginButton';

class Navbar extends React.Component {
    render() {
        return (
            <div className = "navbar">
                <ul className = "navbarList">
                    <li className = "navbarItem">
                        <img src={logo} className = "navbarLogo" alt = "logo"/>
                    </li>
                    <li className = "navbarItem">
                        <Link to = "/" className = "navbarLink"> Contracts </Link>
                    </li>
                    <li className = "navbarItem">
                        <Link to = "/" className = "navbarLink"> Reviews </Link>
                    </li>
                    <li>
                        <LoginButton/>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;