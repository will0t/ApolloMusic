import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gridnavbar.css';
import logo from './logos/ApolloNoSloganWhiteSmall-1.png';
import { AiOutlineSearch } from "react-icons/ai";                                                                                                  

// Searchbar
const SearchBar = ({keyword,setKeyword}) => {
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
}

class GridNavBar extends React.Component {
    render() {
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
                    <span>
                        Profile Name
                    </span>
                </div>
            </div>
        )
    }
}

export default GridNavBar;