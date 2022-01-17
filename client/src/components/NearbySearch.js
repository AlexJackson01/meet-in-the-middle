import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { getAuth } from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import { image_data } from './Images/star-images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';


export default function NearbySearch({ nearby, errorMsg }) {

    let [liked, setLiked] = useState(false);
    let [loginMsg, setLoginMsg] = useState("");
    let [user, setUser] = useState({});
    let [favourite, setFavourite] = useState({
        address: null,
        id: null,
        user: null,
        name: null,
        pointOne: null,
        pointTwo: null,
        rating: null
    });
        
    useEffect(() => {
        renderNearby()
    }, [nearby, favourite])

    const ref = firebase.firestore().collection("favourites");
    const auth = getAuth();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    // if (user === null) {
    //     setLoginMsg("To view places and save them to your Favourites, please login");
    // }

    // console.log(favourite);


    const likePlace = (place) => {
        place.favourite = true; 
        setLiked(!liked);
    }

    const addFavourite = (place) => {
        setFavourite(
    {   address: place.address,
        id: place.id,
        user_id: user.uid,
        name: place.name,
        pointOne: place.pointOne,
        pointTwo: place.pointTwo,
        rating: place.rating.value
            })
    }

    //     const unlikePlace = (place) => {
    //     place.favourite = false;
    //     setLiked(liked);
    // }

    const renderNearby = () => {
        // console.log(liked);
        if (favourite.id !== null) {
            ref
                .doc(favourite.id)
                .set(favourite)
                .catch((err) => {
                    console.log(err);
                })
        }

        if (errorMsg) {
            return (<h5>{errorMsg}</h5>)
        } else if (!user) {
            return (<h5>To view more information, please <a href="/">login</a>.</h5>)
        } else
            {
            return nearby.length >= 1 ? nearby.map((place) => (
                <div className="places-list" key={place.id}>
                    <ul className='place-card'>
                        <li><h4>{place.name}</h4></li>
                        <li><h6>{place.address}</h6></li>
                        <li className='place-url'>{place.url ? <a href={place.url}>Visit their website</a> : null}</li>
                    {place.rating && place.rating.value >= 0 && place.rating.value < 0.75 ? <li><img src={image_data[0].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 0.75 && place.rating.value < 1.25 ? <li><img src={image_data[1].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 1.25 && place.rating.value <= 1.75 ? <li><img src={image_data[2].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 1.75 && place.rating.value <= 2.25 ? <li><img src={image_data[3].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 2.25 && place.rating.value <= 2.75 ? <li><img src={image_data[4].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 2.75 && place.rating.value <= 3.25 ? <li><img src={image_data[5].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 3.25 && place.rating.value <= 3.75 ? <li><img src={image_data[6].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 3.75 && place.rating.value <= 4.25 ? <li><img src={image_data[7].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 4.25 && place.rating.value <= 4.75 ? <li><img src={image_data[8].image} className="star-rating" alt="" /></li> : null}
                        {place.rating && place.rating.value > 4.75 && place.rating.value <= 5 ? <li><img src={image_data[9].image} className="star-rating" alt="" /></li> : null}
                        <li>{!place.rating && <em>{"Rating not available"}</em>}
                        {place.reviews ? <p><em>Others have said: {place.reviews[0].text}</em></p> : <p><em>{"Reviews not available"}</em></p>}</li>
                        <li><p className='place-url'><a href={`https://www.google.com/maps/dir/${place.pointOne}/${place.lat},${place.lng}`} target="_blank">Directions from {place.pointOne.toUpperCase()}</a></p></li>
                        <li><p className='place-url'><a href={`https://www.google.com/maps/dir/${place.pointTwo}/${place.lat},${place.lng}`} target="_blank">Directions from {place.pointTwo.toUpperCase()}</a></p></li>
                        {place.favourite ? (<FontAwesomeIcon icon={fasHeart} size="2x" className="favourite-heart" />) : (<FontAwesomeIcon icon={farHeart} size="2x" className="favourite-heart" onClick={() => { addFavourite(place); likePlace(place); }} />)}
                        {place.favourite && (<p>Added to Favourites!</p>)}
                    </ul>
                        
                </div>
            ))
                : null;
        }
    }


 

    return (
        <div className='container'>
            <div className="places-list col-md-12 col-sm-10 col-xs-10">
                {renderNearby()}


                          {/* <b>{place.rating}</b> */}
            </div>
            </div>
    )
}
