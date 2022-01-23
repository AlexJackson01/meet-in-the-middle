import React from 'react';
import LogoNav from './LogoNav';
import Fade from 'react-reveal/Fade';


export default function About() {
    return (
        <body className='about-body'>
        <div>
            <LogoNav />

            <Fade bottom>
            <div className='about-background'>

            <h6><p>If you’re looking to go somewhere new, if you’re meeting someone who lives on the other side of town or even the country, if you’re a couple going on a date night, someone organising a first date, colleagues going for a working lunch, friends or family having a catch up, or if you’re just plain indecisive about where to go, why not ‘meet in the middle’?</p></h6>

            <h6><p>Meet in the Middle is an app that does what it says on the tin… simply type in two locations, select a place category and radius and hit Search. The app will calculate the midpoint of the two locations by distance and show you the top rated places closest to that midpoint. Details of your midpoint and each nearby place will be marked on a map as well as displayed on screen.</p></h6>

            <h6><p>If you like the look of a place, you can click the heart icon on each card and the place will be added to your Favourites. Or if you don’t find a place that appeals to you, you can clear the Search, select an alternative category/radius and Search again.</p></h6>

            <h6><p>After you’ve met in the middle, you can go to your Favourites page and rate the place you visited. You can give it an overall star rating out of 5, rate it on its price range and also recommend it on different categories by ticking the corresponding boxes as necessary. Submit your rating by clicking the ‘Submit’ button and you will see all your recent reviews displayed at the bottom of the page.</p></h6>

            <h6><p>This is a student project that was created at <a href="http://codeop.tech">CodeOp</a>, a full stack development bootcamp in Barcelona (January 2022). I'm always looking to develop it further so if you have any ideas or feedback, please <a href="/contact">get in touch</a>. I'm very new to this, please be nice :)</p></h6>
                    </div>
            </Fade>
            </div>
            </body>
    )
}
