import React from 'react';
import Logo from "../images/Meet-in-Middle.png";
import { Link } from "react-router-dom";

export default function LogoNav() {
    return (
        <div className='logo-container'>
            {/* <img src={Logo} className="logo" alt="Meet in the Middle logo" /> */}
            <ul className='navbar justify-content-center'>
                <Link to="/"><li className="nav-links">HOME</li></Link>
                <Link to="/favourites"><li className="nav-links">FAVOURITES</li></Link>
                <Link to="/about"><li className="nav-links">HOW IT WORKS</li></Link>
                <Link to="/contact"><li className="nav-links">CONTACT</li></Link>
            </ul>
        </div>
    )
}
