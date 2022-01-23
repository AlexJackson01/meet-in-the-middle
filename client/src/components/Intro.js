import React from 'react';
import DesktopIntro from '../videos/meet-desktop.mp4';
import MobileIntro from '../videos/meet-mobile.mp4';
import { useNavigate } from "react-router-dom";


export default function Intro() {
    const navigate = useNavigate();

    const routeChange = () => {
        navigate('/login'); // using React Router, once login is successful, the page will redirect to the home page
    }



    return (
        <div>
            <div className="intro-container">
            <video loop autoPlay muted className="intro-video">
                    <source src={DesktopIntro} type="video/mp4" />
            </video>
            <video loop autoPlay muted className="mobile-video">
                    <source src={MobileIntro} type="video/mp4" />
            </video>
            </div>
            
            <div className="intro-text">
                <p>Find a location in the middle</p>
                <button className="intro-button" onClick={() => routeChange()}>Get started</button>
            </div>
            </div>
            )
;
}
