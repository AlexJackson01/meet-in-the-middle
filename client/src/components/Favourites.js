import React, {useState, useEffect} from 'react';
import LogoNav from './LogoNav';
import firebase from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Favourites() {

    let [loading, setLoading] = useState(false);
    let [user, setUser] = useState({});
    let [favourites, setFavourites] = useState([]);
    let [showRatings, setShowRatings] = useState(false);
    let [starRating, setStarRating] = useState(false);
    let [ratingValue, setRatingValue] = useState([{place_id: 0, name: "", rating: ""}]);
    let [priceRange, setPriceRange] = useState("");
    let [recommendations, setRecommendations] = useState({
        food_quality: 0,
        customer_service: 0,
        cleanliness: 0,
        access_facilities: 0,
        pet_friendly: 0,
        vibe: 0,
        capacity: 0,
        date_nights: 0,
        work_meetings: 0,
        noise_level: 0,
        drinks_menu: 0,
        coffee: 0,
        seating: 0,
        vegan_veggie: 0
    });
    let [userRating, setUserRating] = useState({});
    let [ratingPosted, setRatingPosted] = useState(false);

    useEffect(() => {
        getFavourites();
    }, [user])

    const ref = firebase.firestore().collection("favourites");
    const ref2 = firebase.firestore().collection("ratings");
    const auth = getAuth();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    
    console.log(ref);
    console.log(ref2);

    const getFavourites = async () => {
        setLoading(true);
        // location.reload();  
        try {
            ref.where("user_id", "==", user.uid).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                })
                setFavourites(items);
                setLoading(false);
            })

            if (favourites.empty) {
                    console.log("no matches");
                    setLoading(false);
                }
         } catch (error) {
                console.log(error.message)
            }
        }
        // ref.where("user_id", "==", user.uid).get().onSnapshot((querySnapshot) => {
        //     const items = [];
        //     querySnapshot.forEach((doc) => {
        //         items.push(doc.data());
        //     });
        //     setFavourites(items);
        // })

    const removeFavourite = (favourite) => {
            ref
                .doc(favourite.id)
                .delete()
                .catch((err) => {
                    console.log(err);
            })
    }

    const removeRating = (favourite) => {
        console.log(userRating);
            ref2
                .doc(favourite.id)
                .delete()
                .catch((err) => {
                    console.log(err);
                })
        setRatingPosted(false);
    }

    const handleOnChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
            console.log(value);
            setRecommendations(state => ({
                ...state, [value]: 1
            }))
        } else {
            setRecommendations(state => ({
                ...state, [value]: 0
            }))}
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(ratingValue, priceRange, recommendations);
        setUserRating({ place_id: ratingValue.place_id, user_id: user.uid, name: ratingValue.name, rating: ratingValue.rating, timeDate: new Date().toLocaleString(), priceRange: priceRange.selectedPrice, recommendations: recommendations });
        console.log(userRating);
        setRatingPosted(true);
    }

    const ratePlace = (favourite) => {
        favourite.stars = true;
        setStarRating(!starRating)
                // e.preventDefault();
        // console.log(ratingValue, favourite.id);

    }

    const toggleRatings = (favourite) => {
        favourite.favourite = true; 
        setShowRatings(!showRatings);
    }

    
    const renderFavourites = () => {
        // if (ratingPosted) {
        //     ref2
        //         .doc(userRating.place_id)
        //         .set(userRating)
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // }
        // if (userRating.place_id !== null) {
        //     setRatingPosted(true);
        // }
        console.log("passed favourites", favourites);
        // favourites.map((favourites) => (
        return favourites.length >= 1 ? favourites.map((favourite) => (
            <div className="favourites-list" key={favourite.id}>
                <ul className='favourites-card'>
                    {/* <li className='favourites-info'><p>Between {favourite.pointOne.toUpperCase()} and {favourite.pointTwo.toUpperCase()}</p></li> */}
                    <li className='favourites-info'><h5>{favourite.name}</h5></li>
                    <li className='favourites-info'><h6>{favourite.address}</h6></li>
                    <li className='favourites-info remove-link' onClick={() => removeFavourite(favourite)}>Remove from Favourites</li>
                    {!favourite.favourite && <li className='favourites-info'>Rate this place<p><FontAwesomeIcon icon={faChevronDown} className='rating-arrow' size='2x' onClick={() => toggleRatings(favourite)} /></p></li>}
                    {favourite.favourite && <li className='favourites-info'>Rate this place<p><FontAwesomeIcon icon={faChevronUp} className='rating-arrow' size='2x' onClick={() => toggleRatings(favourite)} /></p></li>}
                    <div className='ratings'>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                    {favourite.favourite && (
                        [...Array(5)].map((star, i) => {
                        i += 1;
                        return (
                            <button type="button" key={i} className={favourite.stars && i <= ratingValue.rating ? "on" : "off"} onClick={(e) => {setRatingValue({place_id: favourite.id, name: favourite.name, rating: i}); ratePlace(favourite);}} >
                                <div><FontAwesomeIcon icon={faStar} className='rating-stars' size="2x" /></div>
                            </button>
                        )
                        })
                        )}
                        {favourite.favourite && (
                            <div>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => {
                        const selectedPrice = e.target.value;
                    setPriceRange({ selectedPrice });
                    }}>
                    <option defaultValue>Price Range</option>
                    <option value="£">£</option>
                    <option value="££">££</option>
                    <option value="£££">£££</option>
                    <option value="££££">££££</option>
                                </select>
                                <h6>Recommendations:</h6>
                                    <li><input type="checkbox" name="recommendations" value="food_quality" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation1">Food quality</label></li>
                                    <li><input type="checkbox" name="recommendations" value="customer_service" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation2">Customer service</label></li>
                                    <li><input type="checkbox" name="recommendations" value="cleanliness" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation3">Cleanliness</label></li>
                                    <li><input type="checkbox" name="recommendations" value="access_facilities" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation4">Access and facilities</label></li>
                                    <li><input type="checkbox" name="recommendations" value="pet_friendly" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation5">Pet friendly</label></li>
                                    <li><input type="checkbox" name="recommendations" value="vibe" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation6">Vibe/atmosphere</label></li>
                                    <li><input type="checkbox" name="recommendations" value="capacity" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation7">Capacity</label></li>
                                    <li><input type="checkbox" name="recommendations" value="date_nights" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation8">Date nights</label></li>
                                    <li><input type="checkbox" name="recommendations" value="work_meetings" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation9">Work meetings</label></li>
                                    <li><input type="checkbox" name="recommendations" value="noise_level" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation10">Noise level</label></li>
                                    <li><input type="checkbox" name="recommendations" value="drinks_menu" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation11">Drinks menu</label></li>
                                    <li><input type="checkbox" name="recommendations" value="coffee" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation12">Coffee</label></li>
                                    <li><input type="checkbox" name="recommendations" value="seating" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation13">Comfortable seating</label></li>
                                    <li><input type="checkbox" name="recommendations" value="vegan_veggie" onChange={(e) => handleOnChange(e)}/><label htmlFor="recommendation14">Vegan/veggie/dietary options</label></li>                                
                                    <button type="submit" value="submit">Submit</button>
                                    {ratingPosted ? <p><em>Rating submitted!</em></p> : null}
                                    {ratingPosted ? <p className='remove-link' onClick={() => removeRating(favourite)}>Undo?</p> : null}
                                </div>
                            )}
                        </form>
                    </div>    
                </ul>
                <ul className='ratings'>
    
                </ul>
                <ul>
                    {/* {rating > 0 && <p>You have given {favourite.name} a rating of {rating} / 5!</p>} */}
                </ul>   
            </div>
        )) : <h5>No favourites added!</h5>;
        }
            
    return (
        <div className="container">
            <LogoNav />

    {loading && (<FontAwesomeIcon icon={faStar} size="2x" pulse className="loading-star" />)}

            {renderFavourites()}
        </div>
    )
}
