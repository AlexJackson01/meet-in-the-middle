import React, { useEffect } from 'react';

export default function NearbySearch({ nearby }) {

    useEffect(() => {
        renderNearby()
    }, [nearby])

    const renderNearby = () => {
        console.log(nearby);
            return nearby.length > 1 ? nearby.map((place) => (
                <div className="places-list" key={place.id}>
                    <ul className='place-card'>
                        <li><h4>{place.name}</h4></li>
                        <li className='place-url'><a href={place.url}>Visit their website</a></li>
                        <li><img src={place.stars} className='star-rating' alt="" /></li>
                        <li>{place.rating ? <p><b>{place.rating.value}</b> (Foursquare)</p> : <p><em>{"Rating not available"}</em></p>}</li>
                        <li> {place.reviews ? <p><em>Others have said: {place.reviews[0].text}</em></p> : <p><em>{"Reviews not available"}</em></p>}</li>
                    </ul>
                </div>
            ))
            : "No results found..."
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
