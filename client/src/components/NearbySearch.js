import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import { image_data } from './Images/star-images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

export default function NearbySearch ({ nearby, user }) {
  let [liked, setLiked] = useState(false)
  let [favourite, setFavourite] = useState({
    address: null,
    user: null,
    name: null
  })

  useEffect(() => {
    renderNearby()
  }, [nearby, favourite])

  const ref = firebase.firestore().collection('favourites') // connects to Firebase database with the collection 'favourites'

  const likePlace = place => {
    place.favourite = true
    setLiked(!liked)
  }

  const addFavourite = place => {
    // if place has a rating, it gets added to the favourite state including the rating. if not, then it can still be added without the rating. if this was not included, the app errors when trying to favourite a place without a rating
    setFavourite({
      address: place.address,
      user_id: user.uid,
      name: place.name
    })
  }

  const renderNearby = () => {
    if (favourite.id !== null) {
      // once the favourite state is populated, it posts it to the Firebase collection
      ref
        .doc(favourite.id)
        .set(favourite)
        .catch(err => {
          console.log(err)
        })
    }

    if (!user) {
      return null
    } else {
      return nearby.length >= 1
        ? nearby.map(
            (
              place // where the nearby search contains at least 1 result, it will display information on the place in a card
            ) => (
              <div className='places-list' key={place.id}>
                <ul className='place-card'>
                  <li>
                    <h5>{place.name}</h5>
                  </li>
                  <li>
                    <h6>{place.address}</h6>
                  </li>
                  <li className='place-url'>
                    {place.url ? (
                      <a href={place.url}>Visit their website</a>
                    ) : null}
                  </li>

                  {/* This code assigns a different star image based on the place rating */}
                  {place.rating &&
                  place.rating.value >= 0 &&
                  place.rating.value < 0.75 ? (
                    <li>
                      <img
                        src={image_data[0].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 0.75 &&
                  place.rating.value < 1.25 ? (
                    <li>
                      <img
                        src={image_data[1].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 1.25 &&
                  place.rating.value <= 1.75 ? (
                    <li>
                      <img
                        src={image_data[2].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 1.75 &&
                  place.rating.value <= 2.25 ? (
                    <li>
                      <img
                        src={image_data[3].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 2.25 &&
                  place.rating.value <= 2.75 ? (
                    <li>
                      <img
                        src={image_data[4].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 2.75 &&
                  place.rating.value <= 3.25 ? (
                    <li>
                      <img
                        src={image_data[5].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 3.25 &&
                  place.rating.value <= 3.75 ? (
                    <li>
                      <img
                        src={image_data[6].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 3.75 &&
                  place.rating.value <= 4.25 ? (
                    <li>
                      <img
                        src={image_data[7].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 4.25 &&
                  place.rating.value <= 4.75 ? (
                    <li>
                      <img
                        src={image_data[8].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {place.rating &&
                  place.rating.value > 4.75 &&
                  place.rating.value <= 5 ? (
                    <li>
                      <img
                        src={image_data[9].image}
                        className='star-rating'
                        alt=''
                      />
                    </li>
                  ) : null}
                  {/* If there is no rating available, it will display a message */}
                  <li className='place-rating'>
                    {!place.rating && <em>{'Rating not available'}</em>}
                  </li>

                  {/* If no written reviews are available, it will also say so  */}
                  <li>
                    {place.reviews ? (
                      <p>
                        <em>Others have said: {place.reviews[0].text}</em>
                      </p>
                    ) : (
                      <p>
                        <em>{'Reviews not available'}</em>
                      </p>
                    )}
                  </li>

                  {/* Directions links added for each starting location which shows journey on a separate Google Maps tab */}
                  {/* <li><button className='directions-btn'><a href={`https://www.google.com/maps/dir/${place.pointOne}/${place.lat},${place.lng}`} target="_blank">Directions from {place.pointOne.toUpperCase()}</a></button></li>
                        <li><button className='directions-btn'><a href={`https://www.google.com/maps/dir/${place.pointTwo}/${place.lat},${place.lng}`} target="_blank">Directions from {place.pointTwo.toUpperCase()}</a></button></li>
                         */}
                  {/* A heart icon is displayed on each card. When clicked, the heart icon changes to one filled with colour, alongside a confirmation message that it has been added */}
                  {place.favourite ? (
                    <FontAwesomeIcon
                      icon={fasHeart}
                      size='2x'
                      className='favourite-heart'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={farHeart}
                      size='2x'
                      className='favourite-heart'
                      onClick={() => {
                        addFavourite(place)
                        likePlace(place)
                      }}
                    />
                  )}
                  {place.favourite && <p>Added to Favourites!</p>}
                </ul>
              </div>
            )
          )
        : null
    }
  }

  return (
    <div className='nearby-body'>
      <div className='places-list'>{renderNearby()}</div>
    </div>
  )
}
