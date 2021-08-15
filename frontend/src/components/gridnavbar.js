import React from "react";
import { Link } from "react-router-dom";
import "../css/gridnavbar.css";
import logo from './logos/ApolloNoSloganWhiteSmall-1.png';
import { AiOutlineSearch } from "react-icons/ai";    
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';

// Searchbar
const SearchBar = ({ keyword, setKeyword }) => {
  return (
      <div>
            <input 
                className = "searchBar"
                key="random1"
                value={keyword}
                placeholder={"People Search"}
                //onChange={(e) => setKeyword(e.target.value)}
            />
      </div>

  );
};

const GridNavBar = () => {
    const authContext = useAuth0();
    let userDetails;

    if (authContext.isAuthenticated) {
        userDetails = <div>
                <span>Profile Name</span>
            <LogoutButton/>
        </div>;
    } else {
        userDetails = <LoginButton/>
    }
    return (
      <div className="navbarholder">
          <Link to="/" className="logoBackground">
              <img src={logo} className="gridnavbarLogo" alt="logo"/>
          </Link>
          <div className="searchContainer">
              <AiOutlineSearch className="searchIcon"/>
          </div>
          <div className="navbarItem">
              <SearchBar />
          </div>
          <div className="navbarRight">
            {userDetails}
          </div>
      </div>
  );
}

export default GridNavBar;
