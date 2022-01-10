import React, {useState} from 'react';
// import Half from '../images/star-ratings/0.5-star.png';
// import One from '../images/star-ratings/1-star.png';
// import OneHalf from '../images/star-ratings/1.5-star.png';
// import Two from '../images/star-ratings/2-stars.png';
// import TwoHalf from '../images/star-ratings/2.5-star.png';
// import Three from '../images/star-ratings/3-stars.png';
// import ThreeHalf from '../images/star-ratings/3.5-star.png';
// import Four from '../images/star-ratings/4-stars.png';
// import FourHalf from '../images/star-ratings/4.5-star.png';
// import Five from '../images/star-ratings/5-stars.png';

export default function NearbySearch({ POI }) {

    let [extended, setExtended] = useState();
    let poiKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";
    let ids = [];

    if (POI) {
        let extendedID = POI.filter(function (place) {
            return place.dataSources !== undefined
        })
        
        for (let i = 0; i < extendedID.length; i++) {
            ids.push(extendedID[i].dataSources.poiDetails[0].id.slice(0, -1));
            // console.log(ids);
            // for (let id of ids) {
            //     fetch(`https://api.tomtom.com/search/2/poiDetails.json?key=${poiKey}&id=${id}`, {
            //         "method": "GET"
            //     })
            // .then(response => { setExtended(response.json()) })
            //         // .then(responses => {
            //         //     responses.map(response => {
            //         //         return response.json()
            //         //     })
            //         // })
            // }
        }
    }
    





//    console.log(extended);

    // nearby.forEach(place => {
    //     if (place.rating >= 0 && place.rating <= 0.7) {
    //         place.stars = Half;
    //     } else if (place.rating > 0.8 && place.rating <= 1.2) {
    //         place.stars = One;
    //     } else if (place.rating >= 1.3 && place.rating <= 1.7) {
    //         place.stars = OneHalf;
    //     } else if (place.rating >= 1.8 && place.rating <= 2.2) {
    //         place.stars = Two;
    //     } else if (place.rating >= 2.3 && place.rating <= 2.7) {
    //         place.stars = TwoHalf;
    //     } else if (place.rating >= 2.8 && place.rating <= 3.2) {
    //         place.stars = Three;
    //     } else if (place.rating >= 3.3 && place.rating <= 3.7) {
    //         place.stars = ThreeHalf;
    //     } else if (place.rating >= 3.8 && place.rating <= 4.2) {
    //         place.stars = Four;
    //     } else if (place.rating >= 4.3 && place.rating <= 4.7) {
    //         place.stars = FourHalf;
    //     } else if (place.rating >= 4.8 && place.rating <= 5) {
    //         place.stars = Five;
    //     } else {
    //         place.stars = "";
    //     }
    // })


    return (
        <div className='container'>
        <div className="places-list col-md-12 col-sm-10 col-xs-10">
          {POI && (POI.map((place, i) => (
              <div key={i}>
            <ul>
              <li className="place-card">
                          <h5>{place.poi.name}</h5>
                          <p>{place.address.freeformAddress}</p>
              </li>
                </ul>
            </div>
          )))}
                        {/* <img src={place.stars} className='star-rating' alt="" /> */}
                          {/* <b>{place.rating}</b> */}
            </div>
            </div>
    )
}
