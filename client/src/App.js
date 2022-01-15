import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import Star from '../src/star.png';
import { image_data } from "./components/Images/star-images";
import "@fortawesome/fontawesome-svg-core/styles.css";
import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch";
import Favourites from "./components/Favourites";


function App() {
  let [loading, setLoading] = useState(false);
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
  let [favourites, setFavourites] = useState("");
  let [liked, setLiked] = useState("");

  useEffect(() => {
    getNearby()
  }, [midpoint])

  const geoKey = "5b3ce3597851110001cf6248d8248e64cce24e7bae3637d381b685f1";
  // const nearbyKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";
  const nearbyKey = "MpOfnHZhRSBv9wbqjqhYWvYAMWkaFeup";

  let nearbyDetails = [];
  let extendedID = [];
  let nearbyLatLng = [
    { name: "This is your midpoint.", position: [midpoint.lat, midpoint.lng], address: "" }
  ];



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

  const handleSubmit = e => {
  // handle form submit
    e.preventDefault();
    setLoading(true);
    setPoints({pointOne: input.inputOne, pointTwo: input.inputTwo});
    getCoordinates();
  };
  
  const clearSearch = () => {
    setInput({ inputOne: "", inputTwo: "" });
    setNearby("");
    // setNearby("");
    setMidpoint({ lat: "", lng: "" });
    setErrorMsg("");
    setMarkers("");
    // setPoints({ pointOne: "", pointTwo: "" });
  }

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

  const pullFavourites = (place) => {
        console.log("i'm here");
    setFavourites(previous => [...previous, {
            id: place.id,
            name: place.name,
          address: place.address,
              pointOne: points.pointOne,
            pointTwo: points.pointTwo,
            favourite: false,
            rating: place.rating,
            reviews: place.reviews
            }]);

    console.log("added to favourites", favourites);
  }
  
  const removeFavourite = (favourite) => {
    // setFavourites(prevState => {
    //     const favourites = prevState.filter(place => place.id === favourite.id);
    //     return { favourites };
    // });
}

  const getCoordinates = () => {
    let one = `https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputOne}`;
    let two = `https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputTwo}`;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      setMidpoint({
        lat: ((responseOne.data.features[0].geometry.coordinates[1] + responseTwo.data.features[0].geometry.coordinates[1]) / 2).toFixed(8),
        lng: ((responseOne.data.features[0].geometry.coordinates[0] + responseTwo.data.features[0].geometry.coordinates[0]) / 2).toFixed(8)
      })
    }))
      .catch(errors => {
      console.log(errors);
      // react on errors.
    })
  }

  const getNearby = async() => {
    console.log("i'm here");
    console.log(midpoint);
    if (midpoint.lat !== "") {
      const res = await axios.get(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${nearbyKey}&lat=${midpoint.lat}&lon=${midpoint.lng}&radius=${radius.metreConversion}&limit=20&language=en-GB&categorySet=${category.categoryID}`);
      const details = res.data.results;
      const searchOne = details.filter(place => place.dataSources !== undefined);

      for (let place of searchOne) {
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
    

      for (let place of searchOne) {
        const res2 = await axios.get(`https://api.tomtom.com/search/2/poiDetails.json?key=${nearbyKey}&id=${place.dataSources.poiDetails[0].id}`);
        extendedID.push({
          id: res2.data.id,
          rating: res2.data.result.rating,
          reviews: res2.data.result.reviews,
          stars: ""
        })
      }

      let fullDetails = nearbyDetails.map((item, i) => Object.assign({}, item, extendedID[i]));
      console.log(fullDetails);
      // setNearby(fullDetails);
      const searchTwo = fullDetails.filter(place => place.rating !== undefined);
      searchTwo.forEach(place => {
        let five = place.rating.value / 2;
        place.rating.value = five;
      });

      if (searchTwo.length === 0) {
        setErrorMsg("No results found... please try an alternative radius or category.");
      }


      let sorted = searchTwo.sort((a, b) => (b.rating.value) - (a.rating.value));
      let top10 = sorted.slice(0, 10);

      for (let place of top10) {
        nearbyLatLng.push(
          { name: place.name, position: [place.lat, place.lng], address: place.address }
        );
        setMarkers(nearbyLatLng);
      }

      setNearby(top10);
      setLoading(false);

      
      for (let place of nearby) {
        nearbyLatLng.push(
          { name: place.name, position: [place.lat, place.lng], address: place.address }
        );
        setMarkers(nearbyLatLng);
      }

    }
  }

  return (  
    <div className="container">
      <LogoNav />
    <h1>Meet in the Middle</h1>


      {/* STYLED FORM */}
      <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">

      <div className="row col-lg-3 col-xs-3 col-sm-3">
        <div className="form-group">
        <label>Location One:</label>
              <input type="text" className="form-control input-group-lg header" width={150} name="inputOne" placeholder="Please enter an address, location or postal code" value={input.inputOne} onChange={(e) => handleChange(e)}></input>
            </div>
          </div>

      <div className="col-lg-3 col-xs-3 col-sm-3">
      <div className="form-group">
        <label>Location Two:</label>
              <input type="text" className="form-control input-group-lg header" name="inputTwo" placeholder="Please enter an address, location or postal code" value={input.inputTwo} onChange={(e) => handleChange(e)}></input>
            </div>
          </div>
          
      <div className="col-lg-3 col-xs-3 col-sm-3">
          <div className="form-group">
              <label>Category:</label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory({category: selectedCategory})
              }}>
  <option defaultValue>Select a category</option>
  <option value="Restaurant">Restaurant</option>
  <option value="Pub">Pub</option>
  <option value="Cafe">Cafe</option>
  <option value="Cinema">Cinema</option>
  <option value="Nightclub">Nightclub/Bar</option>
  <option value="Museum">Museum/Art Gallery</option>
  <option value="Theatre">Theatre</option>
              </select>
            </div></div>
          
               <div className="col-lg-3 col-xs-3 col-sm-3">
          <div className="form-group">
              <label>Radius:</label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {
                const selectedRadius = e.target.value;
                setRadius({radius: selectedRadius})
              }}>
  <option defaultValue>Select a radius</option>
  <option value="quarter">1/4 mile</option>
  <option value="half">1/2 mile</option>
  <option value="one">1 mile</option>
  <option value="three">3 miles</option>
                <option value="five">5 miles</option>
                <option value="ten">10 miles</option>
                <option value="twenty">20 miles</option>
              </select>
              </div></div>
      
          
      <div className="search-btn">
            <button type="submit" id="search">Search</button>
          </div>
        </div>
      </form>

      <button onClick={(e) => clearSearch(e)}>Clear</button>
      
      {midpoint.lat && <h5>The midpoint between {input.inputOne.toUpperCase()} and {input.inputTwo.toUpperCase()}:</h5>}

      {loading && (<FontAwesomeIcon icon={faStar} size="2x" pulse className="loading-star" />)}
      
      <Map midpoint={midpoint} markers={markers} />  
      {liked && (<h1>{liked}</h1>)}
      <NearbySearch nearby={nearby} errorMsg={errorMsg} images={image_data} pullFavourites={pullFavourites} liked={liked} />
      

    </div>
  );
}

export default App;
