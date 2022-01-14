import React, {useState, useEffect} from 'react';
import LogoNav from './LogoNav';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { image_data } from './Images/star-images';


export default function Favourites() {

    let [loading, setLoading] = useState(false);
    let [favourites, setFavourites] = useState({});
    let [showRatings, setShowRatings] = useState(false);
    let [favourite, setFavourite] = useState("");

    useEffect(() => {
        getFavourites();
    }, [])

    const ref = firebase.firestore().collection("favourites");
    console.log(ref);

    const getFavourites = () => {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setFavourites(items);
            setLoading(false);
        })
    }

        const removeFavourite = (favourite) => {
            ref
                .doc(favourite.id)
                .delete()
                .catch((err) => {
                    console.log(err);
            })
    }

    const toggleRatings = (favourite) => {
    favourite.favourite = true; 
        setShowRatings(!showRatings);
    }
    
    const renderFavourites = () => {
        console.log("passed favourites", favourites);
        // favourites.map((favourites) => (
        return favourites.length >= 1 ? favourites.map((favourite) => (
            <div className="favourites-list" key={favourite.id}>
                <ul className='favourites-card'>
                    <li className='favourites-info'><p>Between {favourite.pointOne.toUpperCase()} and {favourite.pointTwo.toUpperCase()}</p></li>
                    <li className='favourites-info'><h5>{favourite.name}</h5></li>
                    <li className='favourites-info'><h6>{favourite.address}</h6></li>
                    <li className='favourites-info remove-link' onClick={() => removeFavourite(favourite)}>Remove from Favourites</li>
                    {!favourite.favourite && <li className='favourites-info'>Rate this place<p><FontAwesomeIcon icon={faChevronDown} size='2x' onClick={() => toggleRatings(favourite)} /></p></li>}
                    {favourite.favourite && <li className='favourites-info'>Rate this place<p><FontAwesomeIcon icon={faChevronUp} size='2x' onClick={() => toggleRatings(favourite)} /></p></li>}

                </ul>
                <ul className='favourites-card'>
                    <li className='favourites-info'>{favourite.favourite ? <li><p>Rating system here</p></li> : null}</li>
                </ul>    
            </div>
        )) : <h3>No favourites added yet!</h3>;
        }
            
    return (
        <div className="container">
            <LogoNav />

    {loading && (<FontAwesomeIcon icon={faStar} size="2x" pulse className="loading-star" />)}

            {renderFavourites()}
        </div>
    )
}
