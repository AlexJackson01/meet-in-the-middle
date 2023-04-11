import React, { useState, useEffect } from 'react'
import LogoNav from './LogoNav'
import firebase from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade'

export default function Favourites () {
  let [loading, setLoading] = useState(false)
  let [user, setUser] = useState({})
  let [favourites, setFavourites] = useState([])
  let [showRatings, setShowRatings] = useState(false)
  let [starRating, setStarRating] = useState(false)
  let [ratingValue, setRatingValue] = useState([
    { place_id: 0, name: '', rating: '' }
  ])
  let [priceRange, setPriceRange] = useState('')
  let [recommendations, setRecommendations] = useState({
    food_quality: 0,
    customer_service: 0,
    cleanliness: 0,
    access_and_facilities: 0,
    pet_friendly: 0,
    vibe: 0,
    capacity: 0,
    date_nights: 0,
    work_meetings: 0,
    noise_level: 0,
    drinks_menu: 0,
    coffee: 0,
    comfortable_seating: 0,
    vegan_and_veggie_options: 0
  })
  let [userRating, setUserRating] = useState({})
  let [ratingPosted, setRatingPosted] = useState(false)
  let [DBRatings, setDBRatings] = useState({})

  useEffect(() => {
    getFavourites()
  }, [user])

  const ref = firebase.firestore().collection('favourites')
  const ref2 = firebase.firestore().collection('ratings')
  const auth = getAuth()

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
  })

  console.log(ref)
  console.log(ref2)

  const getFavourites = async () => {
    // this function pulls the Favourites data from Firebase
    setLoading(true)
    // location.reload();
    try {
      ref.where('user_id', '==', user.uid).onSnapshot(querySnapshot => {
        // it filters the data pulled from Firebase where the user_id on the entry matches the id of the user currently logged in
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })
        setFavourites(items) // the returned Favourites are added to the favourites to display on screen
        setLoading(false)
      })

      if (favourites.empty) {
        console.log('no matches')
        setLoading(false)
      }
    } catch (error) {
      console.log(error.message)
    }

    try {
      ref2.where('user_id', '==', user.uid).onSnapshot(querySnapshot => {
        // same as the above but for the ratings table/collection on Firebase
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })
        setDBRatings(items)
        setLoading(false)
      })

      if (favourites.empty) {
        console.log('no matches')
        setLoading(false)
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

  const removeFavourite = favourite => {
    // a DELETE method which removes the entry from the Firebase database by its id
    ref
      .doc(favourite.id)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  const removeRating = favourite => {
    // same as the above but this basically 'undos' a rating just posted directly on a Favourite
    console.log(userRating)
    ref2
      .doc(favourite.id)
      .delete()
      .catch(err => {
        console.log(err)
      })
    setRatingPosted(false)
  }

  const removeDBRating = rating => {
    // this one removes existing ratings that were posted in the past - favourite doesn't need to exist anymore. same idea as above but slightly different code needed
    console.log(userRating)
    ref2
      .doc(rating.user_id)
      .delete()
      .catch(err => {
        console.log(err)
      })
    setRatingPosted(false)
  }

  const handleOnChange = e => {
    // this checks whether the checkboxes have been ticked for each rating/review
    const isChecked = e.target.checked
    const value = e.target.value
    if (isChecked) {
      console.log(value)
      setRecommendations(state => ({
        ...state,
        [value]: 1
      }))
    } else {
      setRecommendations(state => ({
        ...state,
        [value]: 0
      }))
    }
  }

  const handleOnSubmit = e => {
    // uses the rating info and sets it to the rating state. rating posted state set to true which triggers a POST method to the Firebase backend
    e.preventDefault()
    // console.log(ratingValue, priceRange, recommendations);
    setUserRating({
      user_id: user.uid,
      name: ratingValue.name,
      rating: ratingValue.rating,
      timeDate: new Date().toLocaleString(),
      priceRange: priceRange.selectedPrice,
      recommendations: recommendations
    })
    console.log(userRating)
    setRatingPosted(true)
  }

  const ratePlace = favourite => {
    // this toggles the state of the coloured rating stars
    favourite.stars = true
    setStarRating(!starRating)
    // e.preventDefault();
    // console.log(ratingValue, favourite.id);
  }

  const toggleRatings = favourite => {
    // toggles the appearance of the ratings form and changes the chevron icon
    favourite.favourite = true
    setShowRatings(!showRatings)
  }

  const renderFavourites = () => {
    // this function maps the favourites on screen and also the ratings form when the arrow is clicked
    if (ratingPosted) {
      ref2
        .doc(userRating.place_id)
        .set(userRating)
        .catch(err => {
          console.log(err)
        })
    }
    // if (userRating.place_id !== null) {
    //     setRatingPosted(true);
    // }
    console.log('passed favourites', favourites)
    if (user) {
      return favourites.length >= 1 ? (
        favourites.map(favourite => (
          <Fade bottom>
            <div className='favourites-list' key={favourite.id}>
              <ul className='favourites-card'>
                {/* <li className='favourites-info'><h6>{favourite.pointOne.toUpperCase()}<br />and<br />{favourite.pointTwo.toUpperCase()}</h6></li> */}
                <li className='favourites-info'>
                  <h6>{favourite.name}</h6>
                </li>
                <li className='favourites-info'>
                  <h6>{favourite.address}</h6>
                </li>
                <li
                  className='favourites-info remove-link'
                  onClick={() => removeFavourite(favourite)}
                >
                  <h6>Remove from Favourites</h6>
                </li>
              </ul>
              <div className='ratings'>
                {!favourite.favourite && (
                  <li className='favourites-info'>
                    Rate this place
                    <p>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className='rating-arrow'
                        size='2x'
                        onClick={() => toggleRatings(favourite)}
                      />
                    </p>
                  </li>
                )}
                {favourite.favourite && (
                  <li className='favourites-info'>
                    Rate this place
                    <p>
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className='rating-arrow'
                        size='2x'
                        onClick={() => toggleRatings(favourite)}
                      />
                    </p>
                  </li>
                )}
                <form
                  className='ratings-show'
                  onSubmit={e => handleOnSubmit(e)}
                >
                  {favourite.favourite &&
                    [...Array(5)].map((star, i) => {
                      // displays the ratings system - class changes and fills the star with colour when clicked
                      i += 1
                      return (
                        <button
                          type='button'
                          key={i}
                          className={
                            favourite.stars && i <= ratingValue.rating
                              ? 'on'
                              : 'off'
                          }
                          onClick={e => {
                            setRatingValue({
                              name: favourite.name,
                              rating: i
                            })
                            ratePlace(favourite)
                          }}
                          required
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faStar}
                              className='rating-stars'
                              size='2x'
                            />
                          </div>
                        </button>
                      )
                    })}
                  {favourite.favourite && (
                    <div>
                      <h6>Please give this place an overall rating</h6>{' '}
                      (required)
                      <select
                        required
                        className='form-select'
                        onChange={e => {
                          const selectedPrice = e.target.value
                          setPriceRange({ selectedPrice })
                        }}
                      >
                        <option value='' aria-label='Default select example'>
                          Price Range
                        </option>
                        <option value='£'>£</option>
                        <option value='££'>££</option>
                        <option value='£££'>£££</option>
                        <option value='££££'>££££</option>
                      </select>
                      <h6>Recommendations:</h6>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='food_quality'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation1'>Food quality</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='customer_service'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation2'>
                          Customer service
                        </label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='cleanliness'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation3'>Cleanliness</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='access_and_facilities'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation4'>
                          Access and facilities
                        </label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='pet_friendly'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation5'>Pet friendly</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='vibe'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation6'>Vibe/atmosphere</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='capacity'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation7'>Capacity</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='date_nights'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation8'>Date nights</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='work_meetings'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation9'>Work meetings</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='noise_level'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation10'>Noise level</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='drinks_menu'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation11'>Drinks menu</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='coffee'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation12'>Coffee</label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='comfortable_seating'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation13'>
                          Comfortable seating
                        </label>
                      </li>
                      <li className='recommendations'>
                        <input
                          type='checkbox'
                          name='recommendations'
                          value='vegan_and_veggie_options'
                          onChange={e => handleOnChange(e)}
                        />
                        <label htmlFor='recommendation14'>
                          Vegan/veggie/dietary options
                        </label>
                      </li>
                      <button
                        type='submit'
                        className='ratings-btn'
                        value='submit'
                      >
                        Submit
                      </button>
                      {ratingPosted ? (
                        <p>
                          <em>Rating submitted!</em>
                        </p>
                      ) : null}
                      {ratingPosted ? (
                        <p
                          className='rating-link'
                          onClick={() => removeRating(favourite)}
                        >
                          Undo?
                        </p>
                      ) : null}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </Fade>
        ))
      ) : (
        <h6>No favourites added!</h6>
      )
    } // this message is displayed when no favourites from the user can be found on the db
  }

  const renderRatings = () => {
    // this one displays the ratings on screen
    if (!user) {
      return (
        <h5>
          To view more information, please <a href='/'>login</a>.
        </h5>
      ) // if no one is logged in, it will display this message
    } else {
      return DBRatings.length >= 1 ? (
        DBRatings.map(rating => (
          <div className='ratings-list' key={rating.place_id}>
            <ul className='ratings-card'>
              <li className='favourites-info'>
                <h5>{rating.timeDate}</h5>
                <h6>{rating.name}</h6>
                <h6>{rating.rating}/5</h6>
                <h6>{rating.priceRange}</h6>
              </li>
              {rating.recommendations && (
                <p>
                  You recommended this place for:
                  {Object.entries(rating.recommendations).map(
                    ([key, value]) => {
                      // this code basically looks at the recommendations object and returns the keys where the values are 1. the values are set to 1 above if the user has ticked the boxes - i searched high and low for this solution
                      return (
                        <div>
                          <b>{value === 1 && key.split('_').join(' ')}</b>
                        </div>
                      )
                    }
                  )}
                </p>
              )}
              <p className='remove-link' onClick={() => removeDBRating(rating)}>
                Remove review
              </p>
            </ul>
          </div>
        ))
      ) : (
        <h6 className='ratings-text'>No ratings added yet!</h6>
      )
    } // this message is displayed when no ratings from the user can be found on the db
  }

  return (
    <div className='favourites-body'>
      <LogoNav />
      <div className='favourites-container'>
        <h3>Your Favourites</h3>
        {/* {loading && (<FontAwesomeIcon icon={faStar} size="2x" pulse className="loading-star" />)} */}
        <div className='col-md-12 col-sm-12 col-xs-12'>
          {renderFavourites()}
        </div>
        <h3>Recent Reviews</h3>
        <div className='ratings-list col-md-12 col-sm-12 col-xs-12'>
          {renderRatings()}
        </div>
      </div>
    </div>
  )
}
