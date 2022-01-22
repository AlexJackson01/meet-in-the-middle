import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { image_data } from "./components/Images/star-images";
import "@fortawesome/fontawesome-svg-core/styles.css";
import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch";

function App() {
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({});
  let [input, setInput] = useState({ inputOne: "", inputTwo: "" });
  let [points, setPoints] = useState({pointOne: "", pointTwo: ""});
  let [category, setCategory] = useState({ category: "" });
  let [radius, setRadius] = useState({ radius: "" });
  let [nearby, setNearby] = useState({
    id: "",
    name: "",
    address: "",
    url: "",
    favourite: false
  });
  let [midpoint, setMidpoint] = useState({ lat: "", lng: "" });
  let [markers, setMarkers] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let [liked, setLiked] = useState("");

  useEffect(() => { // useEffect calls the nearby search function when the midpoint state updates - this allows the API calls to all run with one button click
    getNearby()
  }, [midpoint])

  const auth = getAuth(); // Firebase authentication

  onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); // user state is set with details of the current signed in user
    })

  // external API keys
  const geoKey = "5b3ce3597851110001cf6248d8248e64cce24e7bae3637d381b685f1";
  const nearbyKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";

  // defining arrays used in API search
  let nearbyDetails = [];
  let extendedID = [];
  let nearbyLatLng = [
    { name: "This is your midpoint.", position: [midpoint.lat, midpoint.lng], address: "" }
  ];

  // setting the input state. the input is also saved to a points state - this is so it's not lost when the input is reset and can be posted to the backend later on
  const handleChange = e => {
  const name = e.target.name;
  const value = e.target.value;

  setInput(state => ({
    ...state,
    [name]: value
}))
    
  setPoints(state => ({
  ...state,
  [name]: value
}))
}

  // when the search form is submitted, it sets the loading state to true and calls the first API call
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    getCoordinates();
};
  
  // a function to clear the search if the user wants to use an alternative location, category or radius
  const clearSearch = () => {
    setInput({ inputOne: "", inputTwo: "" });
    setNearby("");
    setMidpoint({ lat: "", lng: "" });
    setErrorMsg("");
    setMarkers("");
    setLoading(false);
}

  // if statements that take the selected category and radius. and assigns an ID/value - this ID/value feeds into the API calls
  if (category.category) {
    category.category === "Restaurant" ? category.categoryID = 7315 : category.place = "";
    category.category === "Cafe" ? category.categoryID = 9376002 : category.place = "";
    category.category === "Pub" ? category.categoryID = 9376003 : category.place = "";
    category.category === "Cinema" ? category.categoryID = 7342 : category.place = "";
    category.category === "Nightclub" ? category.categoryID = 9379 : category.place = "";
    category.category === "Museum" ? category.categoryID = 7317 : category.place = "";
    category.category === "Theatre" ? category.categoryID = 7318 : category.place = "";
}

  if (radius.radius) {
    radius.radius === "quarter" ? radius.metres = Math.round(0.25 * 1609.34) : radius.metreConversion = "";
    radius.radius === "half" ? radius.metres = Math.round(0.5 * 1609.34) : radius.metreConversion = "";
    radius.radius === "one" ? radius.metres = Math.round(1 * 1609.34) : radius.metreConversion = "";
    radius.radius === "three" ? radius.metres = Math.round(3 * 1609.34) : radius.metreConversion = "";
    radius.radius === "five" ? radius.metres = Math.round(5 * 1609.34) : radius.metreConversion = "";
    radius.radius === "ten" ? radius.metres = Math.round(10 * 1609.34) : radius.metreConversion = "";
    radius.radius === "twenty" ? radius.metres = Math.round(20 * 1609.34) : radius.metreConversion = "";
}

  const getCoordinates = () => {
    let one = `https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputOne}`; // using the geoKey, these API calls brings back the lat and lng of the two inputted locations
    let two = `https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputTwo}`;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      setMidpoint({ // with the returned data, the midpoint state is set by calculating the average of the lats and average of the lngs
        lat: ((responseOne.data.features[0].geometry.coordinates[1] + responseTwo.data.features[0].geometry.coordinates[1]) / 2).toFixed(8),
        lng: ((responseOne.data.features[0].geometry.coordinates[0] + responseTwo.data.features[0].geometry.coordinates[0]) / 2).toFixed(8)
      })
    }))
      .catch(errors => {
      console.log(errors);
    })
}
  // using the midpoint lat and lng, the selected category and radius, a nearby search API is called 
  const getNearby = async() => {
    if (midpoint.lat !== "") { // when the midpoint.lat is populated, the nearby search call begins
      const res = await axios.get(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${nearbyKey}&lat=${midpoint.lat}&lon=${midpoint.lng}&radius=${radius.metreConversion}&limit=20&language=en-GB&categorySet=${category.categoryID}`);
      const details = res.data.results;
      const searchOne = details.filter(place => place.dataSources !== undefined); // the search results of the first call are filtered. Any places that do not have a specific ID in 'dataSources' are filtered out. This is because the IDs are crucial in the next API call.

      for (let place of searchOne) { // relevant data from the first nearby search is pushed to an array
        nearbyDetails.push({
          id: place.dataSources.poiDetails[0].id,
          name: place.poi.name,
          address: place.address.freeformAddress,
          url: place.poi.url,
          pointOne: input.inputOne,
          pointTwo: input.inputTwo,
          lat: place.position.lat,
          lng: place.position.lon
      })
  }    
      // This code loops through the aforementioned IDs and calls the extended API search on each one - this brings back data such as ratings, reviews and photos to be used in the NearbySearch component
      for (let place of searchOne) {
        const res2 = await axios.get(`https://api.tomtom.com/search/2/poiDetails.json?key=${nearbyKey}&id=${place.dataSources.poiDetails[0].id}`);
        extendedID.push({ // relevant data from the second search is pushed to an array
          id: res2.data.id,
          rating: res2.data.result.rating,
          reviews: res2.data.result.reviews,
          stars: ""
        })
      }

      let searchTwo = nearbyDetails.map((item, i) => Object.assign({}, item, extendedID[i])); // the results from search 1 and 2 are joined together

      searchTwo.forEach(place => {
        if (place.rating !== undefined) { // in the joined data, if the place has a rating, it is divided by 2 and reassigned. This is so the ratings are out of 5 stars for consistency
          let five = (place.rating.value) / 2;
          place.rating.value = five;  
      }
    });

      if (searchTwo.length === 0) { // if there are no results found in either search, it will display an error message
        setErrorMsg("No results found... please try an alternative radius or category.");
      }

      let top10 = searchTwo.slice(0, 10); // the joined results are sliced to only include a 'top 10'

      for (let place of top10) { // for the purpose of marking places on the map, the final places and their details are pushed to an array and assigned to the markers state
        nearbyLatLng.push(
          { name: place.name, position: [place.lat, place.lng], address: place.address }
        );
        setMarkers(nearbyLatLng);
      }

      if (user) { // if a user is logged in, the top 10 search results are assigned to the nearby state and displayed on screen (via the NearbySearch component). 
      setNearby(top10);
      setLoading(false);
      }  

    }
  }

  return (  
    <div>
      <LogoNav />
      <div className="container">

      {/* STYLED FORM */}
      <form className="input-form" align="center" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
        <div className="col-lg-3 col-md-6 col-xs-12 col-sm-6">
          <div className="form-group">
            <label>Location One:</label>
              <input type="text" className="form-control input-group-lg header" width={150} name="inputOne" value={input.inputOne} onChange={(e) => handleChange(e)} required></input>
            </div>
          </div>

        <div className="col-lg-3 col-md-6 col-xs-12 col-sm-6">
        <div className="form-group">
          <label>Location Two:</label>
            <input type="text" className="form-control input-group-lg header" name="inputTwo" value={input.inputTwo} onChange={(e) => handleChange(e)} required></input>
          </div>
        </div>
          
        <div className="col-lg-3 col-md-6 col-xs-12 col-sm-6">
          <div className="form-group">
            <label>Category:</label>
              <select className="form-select" onChange={(e) => {const selectedCategory = e.target.value; setCategory({category: selectedCategory})}} name="" required>
                <option value="">Select a category</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Pub">Pub</option>
                <option value="Cafe">Cafe</option>
                <option value="Cinema">Cinema</option>
                <option value="Nightclub">Nightclub/Bar</option>
                <option value="Museum">Museum/Art Gallery</option>
                <option value="Theatre">Theatre</option>
              </select>
            </div></div>
          
  <div className="col-lg-3 col-md-6 col-xs-12 col-sm-6">
          <div className="form-group">
              <label>Radius:</label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {
                const selectedRadius = e.target.value;
                setRadius({radius: selectedRadius})
              }} name="" required>
  <option value="">Select a radius</option>
  <option value="quarter">1/4 mile</option>
  <option value="half">1/2 mile</option>
  <option value="one">1 mile</option>
  <option value="three">3 miles</option>
                <option value="five">5 miles</option>
                <option value="ten">10 miles</option>
                <option value="twenty">20 miles</option>
              </select>
              </div></div></div>
      
          <div className="row">
      <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                <button className="search-btn" type="submit" id="search">Search</button>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                <button className="search-btn" onClick={(e) => clearSearch(e)}>Clear</button>
                </div>
              </div>
          </form>

      {/* <button onClick={(e) => clearSearch(e)}>Clear</button> */}
      
      {user && midpoint.lat && <h5 className="midpoint-msg">The midpoint between {input.inputOne.toUpperCase()} and {input.inputTwo.toUpperCase()}:</h5>}

      {loading && (<FontAwesomeIcon icon={faEarthAmericas} size="2x" pulse className="loading-earth" />)}
      
      <Map midpoint={midpoint} markers={markers} user={user} />  
      {liked && (<h1>{liked}</h1>)}
      <NearbySearch className="slide-in-bottom" nearby={nearby} errorMsg={errorMsg} images={image_data} user={user} liked={liked} />
      
</div>
    </div>
  );
}

export default App;
