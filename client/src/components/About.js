import React from 'react'
import LogoNav from './LogoNav'
import Fade from 'react-reveal/Fade'
import Me from '../images/photo-me.jpg'
import Search from '../images/Search.gif'
import Favourite from '../images/Favourites.gif'
import Rating from '../images/Ratings.gif'

export default function About () {
  return (
    <div className='about-body'>
      <LogoNav />

      <Fade bottom>
        <div className='about-container'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <p>
                If you’re looking to go <b>somewhere new</b>, if you’re meeting
                someone who <b>lives on the other side of town</b> or even the
                country, if you’re a couple going on a <b>date night</b>,
                someone organising a <b>first date</b>, colleagues going for a{' '}
                <b>working lunch</b>, friends or family having a <b>catch up</b>
                , or if you’re just plain <b>indecisive</b> about where to go,
                why not{' '}
                <b>
                  <em>‘meet in the middle’?</em>
                </b>
              </p>

              <p>
                Meet in the Middle is an app that does what it says on the tin…
                simply type in two locations, select a place category and radius
                and hit Search. The app will calculate the midpoint of the two
                locations by distance and show you the top rated places closest
                to that midpoint. Details of your midpoint and each nearby place
                will be marked on a map as well as displayed on screen.
              </p>

              <img src={Search} alt='' className='about-gifs' />

              <p>
                If you like the look of a place, you can click the heart icon on
                each card and the place will be added to your Favourites. Or if
                you don’t find a place that appeals to you, you can clear the
                Search, select an alternative category/radius and Search again.
              </p>

              <img src={Favourite} alt='' className='about-gifs' />

              <p>
                After you’ve met in the middle, you can go to your Favourites
                page and rate the place you visited. You can give it an overall
                star rating out of 5, rate it on its price range also recommend
                it on different categories by ticking the corresponding boxes as
                necessary. Submit your rating by clicking the ‘Submit’ button
                and you will see all your recent reviews displayed at the bottom
                of the page.
              </p>

              <img src={Rating} alt='' className='about-gifs' />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <p className='about-title'>About Me</p>
              <img src={Me} alt='' className='me-photo' />
              <p className='about-text'>
                Hi, I'm Alex, I'm based in London, UK and I'm a career switcher
                looking to get into tech!
              </p>
              <p className='about-text'>
                I'm a History postgrad and have been working in Social Research
                for the past 9 years. I'm now ready to move onto a new challenge
                and have recently discovered my love for coding.
              </p>
              <p className='about-text'>
                Meet in the Middle is a student project that was created at{' '}
                <a href='http://codeop.tech'>CodeOp</a>, a full stack
                development bootcamp in Barcelona (January 2022). I created it
                because I'm always wanting to try new things and places. Now
                that I live in a different area to my loved ones, it's always
                helpful to meet at a convenient place in the middle when we
                reunite. I hope that others find it as useful.
              </p>
              <p className='about-text'>
                I'm always looking to develop it further so if you have any
                ideas or feedback, please <a href='/contact'>get in touch</a>.
                Please check out my{' '}
                <a href='https://github.com/AlexJackson01'>Github</a> for more
                info on where I want to take this next.
              </p>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}
