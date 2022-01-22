import React from 'react';
import Logo from '../images/meet-logo.png';

export default function Footer() {
    return (
        <div>
        <div className="footer col-lg-6">
            <img src={Logo} className="footer-image" alt="" />   
         <h6><a class="a-email" href="mailto:meetinthemiddle.app@gmail.com">meetinthemiddle.app@gmail.com</a></h6>
                </div>
    </div>
)
}
