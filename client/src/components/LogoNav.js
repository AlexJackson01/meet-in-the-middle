import React, {useState} from 'react';
import Logo from "../images/Meet-in-Middle.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
    onAuthStateChanged, signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoNav() {
    const [user, setUser] = useState({});

    const auth = getAuth();
    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const logOut = async () => {
        await signOut(auth);
        navigate('/');  
    }

    return (
        <div className='logo-container'>
            {/* <img src={Logo} className="logo" alt="Meet in the Middle logo" /> */}
            <div className='user-greeting'>Hello, {user?.email}!<div><button className='search-btn' onClick={logOut}>Log out</button></div>
</div>
            <ul className='navbar justify-content-center'>
                <Link to="/home"><li className="nav-links">HOME</li></Link>
                <Link to="/favourites"><li className="nav-links">FAVOURITES</li></Link>
                <Link to="/about"><li className="nav-links">HOW IT WORKS</li></Link>
                <Link to="/contact"><li className="nav-links">CONTACT</li></Link>
            </ul>
        </div>
    )
}
