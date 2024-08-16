import React from "react"
import './../Styles/Navbar.css';
import {Link} from 'react-router-dom'

const NavBar = ({links}) => {
    return (
        <div className="navbar">
            <div className="logo">
                <h2>Nivesh Trading</h2>
            </div>
            <div className="navdiv"></div>
        </div>
    )
}

export default NavBar;