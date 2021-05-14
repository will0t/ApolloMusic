import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gridnavbar.css';
import logo from './logos/APOLLO_LOGO.png'

// Searchbar
const SearchBar = ({keyword,setKeyword}) => {
  return (
    <input 
     className = "searchBar"
     key="random1"
     value={keyword}
     placeholder={"search account"}
     //onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

class GridNavBar extends React.Component {
    render() {
        return (
            <div className = "navbarholder">
                <div className = "navbarItem">
                    <img src={logo} className = "gridnavbarLogo" alt = "logo"/>
                </div>
                <div className = "navbarItem">
                    <SearchBar />
                </div>
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

export default GridNavBar;