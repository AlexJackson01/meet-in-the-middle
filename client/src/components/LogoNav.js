import React, {useState} from 'react';
import Logo from "../images/meet-logo.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoNav() {
    const [user, setUser] = useState({});
    const [menu, setMenu] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate(); // useNavigate is a feature from React Router which redirects the user if they successfully login/log out

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);     // details of the current user are assigned to the user state   
    })

    const logOut = async () => {
        await signOut(auth);
        navigate('/');  
    }
    
    const toggleMenu = () => {
        setMenu(!menu); // toggles menu on smaller screen sizes as the Bootstrap toggle wasn't working as well
    }

    let show = menu ? "show" : "";

    return (
        <div className=''>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={Logo} className="logo-image" alt="" />
      <button className="navbar-toggler" type="button" onClick={() => toggleMenu()}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <a className="nav-item nav-link left-nav-link1 active" href="/">HOME <span class="sr-only">(current)</span></a>
          <a className="nav-item nav-link left-nav-link2" href="/">FAVOURITES</a>
          <a className="nav-item nav-link right-nav-link1" href="/">HOW IT WORKS</a>
          <a className="nav-item nav-link right-nav-link2" href="/">CONTACT</a>
        </div>
      </div>
    </nav>
            
            {/* The user will be greeted either by name (if logged in with Google) or by their email address */}
            {user && <div className='user-greeting'>Hello, {user.displayName ? user.displayName : user?.email}!<button className='btn-danger' onClick={logOut}>Logout</button></div>}
        </div>
    )
}
