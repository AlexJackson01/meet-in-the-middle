import React from 'react';
import Logo from "../images/Meet-in-Middle.png";

export default function LogoNav() {
    return (
        <div className='logo-container'>
            <img src={Logo} className="logo" alt="Meet in the Middle logo" />
            <ul className='navbar justify-content-center'>
                <li className='nav-links'>HOME</li>
                <li className='nav-links'>FAVOURITES</li>
                <li className='nav-links'>HOW IT WORKS</li>
                <li className='nav-links'>CONTACT</li>
            </ul>
        </div>
    )
}
