import React from 'react';
import LogoNav from './LogoNav';
import { image_data } from './Images/star-images';


export default function Favourites({ favourites, input, removeFavourite }) {

    
    const renderFavourites = () => {
        console.log("passed favourites", favourites);
        // favourites.map((favourites) => (
        return favourites.length >= 1 ? favourites.map((favourite) => (
            <div className="favourites-list" key={favourite.id}>
                <ul className='favourites-card'>
                    <li className='favourites-info'><h5>Between {input.inputOne.toUpperCase()} and {input.inputTwo.toUpperCase()}</h5></li>
                    <li className='favourites-info'><h4>{favourite.name}</h4></li>
                    <li className='favourites-info'><h6>{favourite.address}</h6></li>
                    <li className='places-url favourites-info'>{favourite.url ? <a href={favourite.url}>Visit their website</a> : null}</li>
                    {favourite.rating.value >= 0 && favourite.rating.value < 0.7 ? <li><img src={image_data[0].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 0.7 && favourite.rating.value < 1.2 ? <li><img src={image_data[1].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 1.2 && favourite.rating.value <= 1.7 ? <li><img src={image_data[2].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 1.7 && favourite.rating.value <= 2.2 ? <li><img src={image_data[3].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 2.2 && favourite.rating.value <= 2.7 ? <li><img src={image_data[4].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 2.7 && favourite.rating.value <= 3.2 ? <li><img src={image_data[5].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 3.2 && favourite.rating.value <= 3.7 ? <li><img src={image_data[6].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 3.7 && favourite.rating.value <= 4.2 ? <li><img src={image_data[7].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 4.2 && favourite.rating.value <= 4.7 ? <li><img src={image_data[8].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 4.7 && favourite.rating.value <= 5.2 ? <li><img src={image_data[9].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 5.2 && favourite.rating.value <= 5.7 ? <li><img src={image_data[10].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 5.7 && favourite.rating.value <= 6.2 ? <li><img src={image_data[11].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 6.2 && favourite.rating.value <= 6.7 ? <li><img src={image_data[12].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 6.7 && favourite.rating.value <= 7.2 ? <li><img src={image_data[13].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 7.2 && favourite.rating.value <= 7.7 ? <li><img src={image_data[14].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 7.7 && favourite.rating.value <= 8.2 ? <li><img src={image_data[15].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 8.2 && favourite.rating.value <= 8.7 ? <li><img src={image_data[16].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 8.7 && favourite.rating.value <= 9.2 ? <li><img src={image_data[17].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 9.2 && favourite.rating.value <= 9.7 ? <li><img src={image_data[18].image} className="star-rating favourites-info" alt="" /></li> : null}
                    {favourite.rating.value > 9.7 && favourite.rating.value <= 10 ? <li><img src={image_data[19].image} className="star-rating favourites-info" alt="" /></li> : null}
                    <li className='favourites-info'>{favourite.rating ? <p><b>{Math.round(favourite.rating.value * 10) / 10}</b> (Foursquare)</p> : <p><em>{"Rating not available"}</em></p>}</li>
                    {/* <li>{favourite.reviews}</li> */}
                    {/* {favourites.favourite ? (<FontAwesomeIcon icon={fasHeart} size="2x" className="favourite-heart" onClick={(e) => removeFavourites(e)} />) : (<FontAwesomeIcon icon={farHeart} size="2x" className="favourite-heart" />) } */}
                    <li className='favourites-info' onClick={() => removeFavourite(favourite)}>Remove from Favourites</li>
                    {favourites.favourite && (<p>Added to Favourites!</p>)}
                </ul>
            </div>
        )) : "No favourites added!";
        }
        

    
    return (
        <div className="container">
            <LogoNav />

            {renderFavourites()}
        </div>
    )
}
