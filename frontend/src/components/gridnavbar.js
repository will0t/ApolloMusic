import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gridnavbar.css';
import logo from './logos/APOLLO_LOGO.png'

class NewNavbar extends React.Component {
    render() {
        return (
            <div className = "navbarholder">
                <div className = "navbarItem">
                    <img src={logo} className = "gridnavbarLogo" alt = "logo"/>
                </div>
                <div></div>
                <div className = "navbarItem">
                    <Link to = "/" className = "gridnavbarLink"> Contracts </Link>
                </div>
                <div className = "navbarItem">
                    <Link to = "/" className = "gridnavbarLink"> Reviews </Link>
                </div>
            </div>
        )
    }
}

export default NewNavbar;