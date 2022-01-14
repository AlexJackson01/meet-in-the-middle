import React from 'react';
import LogoNav from './LogoNav';
import { image_data } from './Images/star-images';


export default function Favourites({ favourites, points, removeFavourite }) {

    
    const renderFavourites = () => {
        console.log("passed favourites", favourites);
        // favourites.map((favourites) => (
        return favourites.length >= 1 ? favourites.map((favourite) => (
            <div className="favourites-list" key={favourite.id}>
                <ul className='favourites-card'>
                    <li className='favourites-info'><h5>Between {points.pointOne.toUpperCase()} and {points.pointTwo.toUpperCase()}</h5></li>
                    <li className='favourites-info'><h4>{favourite.name}</h4></li>
                    <li className='favourites-info'><h6>{favourite.address}</h6></li>
                    <li className='places-url favourites-info'>{favourite.url ? <a href={favourite.url}>Visit their website</a> : null}</li>
                    {favourite.rating.value >= 0 && favourite.rating.value < 0.75 ? <li><img src={image_data[0].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 0.75 && favourite.rating.value < 1.25 ? <li><img src={image_data[1].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 1.25 && favourite.rating.value <= 1.75 ? <li><img src={image_data[2].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 1.75 && favourite.rating.value <= 2.25 ? <li><img src={image_data[3].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 2.25 && favourite.rating.value <= 2.75 ? <li><img src={image_data[4].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 2.75 && favourite.rating.value <= 3.25 ? <li><img src={image_data[5].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 3.25 && favourite.rating.value <= 3.85 ? <li><img src={image_data[6].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 3.75 && favourite.rating.value <= 4.25 ? <li><img src={image_data[7].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 4.25 && favourite.rating.value <= 4.75 ? <li><img src={image_data[8].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 4.75 && favourite.rating.value <= 5 ? <li><img src={image_data[9].image} className="star-rating favourites-info" alt="" /></li> : null}
                    <li className='favourites-info'>{favourite.rating ? <p><b>{Math.round(favourite.rating.value * 10) / 10}</b> (Foursquare)</p> : <p><em>{"Rating not available"}</em></p>}</li>
                    {/* <li>{favourite.reviews}</li> */}
                    {/* {favourites.favourite ? (<FontAwesomeIcon icon={fasHeart} size="2x" className="favourite-heart" onClick={(e) => removeFavourites(e)} />) : (<FontAwesomeIcon icon={farHeart} size="2x" className="favourite-heart" />) } */}
                    <li className='favourites-info' onClick={() => removeFavourite(favourite)}>Remove from Favourites</li>
                    {favourites.favourite && (<p>Added to Favourites!</p>)}
                </ul>
            </div>
        )) : <h3>No favourites added yet!</h3>;
        }
        

    
    return (
        <div className="container">
            <LogoNav />

            {renderFavourites()}
        </div>
    )
}
