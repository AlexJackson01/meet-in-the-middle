import React, { useState } from 'react';
import Half from '../images/star-ratings/0.5-star.png';
import One from '../images/star-ratings/1-star.png';
import OneHalf from '../images/star-ratings/1.5-star.png';
import Two from '../images/star-ratings/2-stars.png';
import TwoHalf from '../images/star-ratings/2.5-star.png';
import Three from '../images/star-ratings/3-stars.png';
import ThreeHalf from '../images/star-ratings/3.5-star.png';
import Four from '../images/star-ratings/4-stars.png';
import FourHalf from '../images/star-ratings/4.5-star.png';
import Five from '../images/star-ratings/5-stars.png';

export default function NearbySearch({ nearby }) {

    nearby.forEach(place => {
        if (place.rating >= 0 && place.rating <= 0.5) {
            place.stars = Half;
        } else if (place.rating > 0.5 && place.rating <= 1) {
            place.stars = One;
        } else if (place.rating > 1 && place.rating <= 1.5) {
            place.stars = OneHalf;
        } else if (place.rating > 1.5 && place.rating <= 2) {
            place.stars = Two;
        } else if (place.rating > 2 && place.rating <= 2.5) {
            place.stars = TwoHalf;
        } else if (place.rating > 2.5 && place.rating <= 3) {
            place.stars = Three;
        } else if (place.rating > 3 && place.rating <= 3.5) {
            place.stars = ThreeHalf;
        } else if (place.rating > 3.5 && place.rating <= 4) {
            place.stars = Four;
        } else if (place.rating > 4 && place.rating <= 4.5) {
            place.stars = FourHalf;
        } else if (place.rating > 4.5 && place.rating <= 5) {
            place.stars = Five;
        } else {
            place.stars = "";
        }
    })


    return (
        <div className='container'>
        <div className="places-list col-md-12 col-sm-10 col-xs-10">
          {nearby.map((place, i) => (
              <div key={i}>
            <ul>
              <li className="place-card">
                {/* {place.photos[0].html_attributions[0]} */}
                          <h5>{place.name}</h5>
                          <img src={place.stars} className='star-rating' alt="" />
                          <b>{place.rating}</b>
                <p>{place.vicinity}</p>
              </li>
                </ul>
            </div>
          ))}
            </div>
            </div>
    )
}
