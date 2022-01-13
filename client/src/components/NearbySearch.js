import React, { useEffect } from 'react';
import { image_data } from './Images/star-images';

export default function NearbySearch({ nearby, errorMsg }) {

    useEffect(() => {
        renderNearby()
    }, [nearby])


    const renderNearby = () => {
        console.log(nearby);
        if (errorMsg) {
            return (<h5>{errorMsg}</h5>)
        } else {
            return nearby.length >= 1 ? nearby.map((place) => (
                <div className="places-list" key={place.id}>
                    <ul className='place-card'>
                        <li><h4>{place.name}</h4></li>
                        <li><h6>{place.address}</h6></li>
                        <li className='place-url'>{place.url ? <a href={place.url}>Visit their website</a> : null}</li>
                    {place.rating.value >= 0 && place.rating.value < 0.7 ? <li><img src={image_data[0].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 0.7 && place.rating.value < 1.2 ? <li><img src={image_data[1].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 1.2 && place.rating.value <= 1.7 ? <li><img src={image_data[2].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 1.7 && place.rating.value <= 2.2 ? <li><img src={image_data[3].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 2.2 && place.rating.value <= 2.7 ? <li><img src={image_data[4].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 2.7 && place.rating.value <= 3.2 ? <li><img src={image_data[5].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 3.2 && place.rating.value <= 3.7 ? <li><img src={image_data[6].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 3.7 && place.rating.value <= 4.2 ? <li><img src={image_data[7].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 4.2 && place.rating.value <= 4.7 ? <li><img src={image_data[8].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 4.7 && place.rating.value <= 5.2 ? <li><img src={image_data[9].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 5.2 && place.rating.value <= 5.7 ? <li><img src={image_data[10].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 5.7 && place.rating.value <= 6.2 ? <li><img src={image_data[11].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 6.2 && place.rating.value <= 6.7 ? <li><img src={image_data[12].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 6.7 && place.rating.value <= 7.2 ? <li><img src={image_data[13].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 7.2 && place.rating.value <= 7.7 ? <li><img src={image_data[14].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 7.7 && place.rating.value <= 8.2 ? <li><img src={image_data[15].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 8.2 && place.rating.value <= 8.7 ? <li><img src={image_data[16].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 8.7 && place.rating.value <= 9.2 ? <li><img src={image_data[17].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 9.2 && place.rating.value <= 9.7 ? <li><img src={image_data[18].image} className="star-rating" alt="" /></li> : null}
                        {place.rating.value > 9.7 && place.rating.value <= 10 ? <li><img src={image_data[19].image} className="star-rating" alt="" /></li> : null}  
                        <li>{place.rating ? <p><b>{Math.round(place.rating.value * 10) / 10}</b> (Foursquare)</p> : <p><em>{"Rating not available"}</em></p>}</li>
                        <li> {place.reviews ? <p><em>Others have said: {place.reviews[0].text}</em></p> : <p><em>{"Reviews not available"}</em></p>}</li>
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
