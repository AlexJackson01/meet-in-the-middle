import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
// import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch";
import Half from './images/star-ratings/0.5-star.png';
import One from './images/star-ratings/1-star.png';
import OneHalf from './images/star-ratings/1.5-star.png';
import Two from './images/star-ratings/2-stars.png';
import TwoHalf from './images/star-ratings/2.5-star.png';
import Three from './images/star-ratings/3-stars.png';
import ThreeHalf from './images/star-ratings/3.5-star.png';
import Four from './images/star-ratings/4-stars.png';
import FourHalf from './images/star-ratings/4.5-star.png';
import Five from './images/star-ratings/5-stars.png';
import FiveHalf from './images/star-ratings/5.5-stars.png';
import Six from './images/star-ratings/6-stars.png';
import SixHalf from './images/star-ratings/6.5-stars.png';
import Seven from './images/star-ratings/7-stars.png';
import SevenHalf from './images/star-ratings/7.5-stars.png';
import Eight from './images/star-ratings/8-stars.png';
import EightHalf from './images/star-ratings/8.5-stars.png';
import Nine from './images/star-ratings/9-stars.png';
import NineHalf from './images/star-ratings/9.5-stars.png';
import Ten from './images/star-ratings/10-stars.png'; 

function App() {
  let [loading, setLoading] = useState(false);
  let [input, setInput] = useState({ inputOne: "", inputTwo: "" });
  let [category, setCategory] = useState({ category: "", categoryID: "" });
  let [radius, setRadius] = useState({ radius: "", metreConversion: "" });
  let [nearby, setNearby] = useState({
    id: "",
    name: "",
    address: "",
    url: ""
  });
  let [midpoint, setMidpoint] = useState({ lat: "", lng: "" });
  let [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getNearby()
  }, [midpoint])

  const geoKey = "5b3ce3597851110001cf6248d8248e64cce24e7bae3637d381b685f1";
  // const nearbyKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";
  const nearbyKey = "MpOfnHZhRSBv9wbqjqhYWvYAMWkaFeup";

  let nearbyDetails = [];
  let extendedID = [];

    const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(state => ({
      ...state,
      [name]: value
    }))
  }

  const handleSubmit = e => {
  // handle form submit
    e.preventDefault();
    setLoading(true);
    getCoordinates();
    setLoading(false);
  };

  const clearForm = (e) => {
    setInput("");
  };
  
  const clearSearch = () => {
    setInput({ inputOne: "", inputTwo: "" });
    setNearby("");
    // setNearby("");
    setMidpoint({ lat: "", lng: "" });
    setErrorMsg("");
  }

  if (category.category) {
    if (category.category === 'restaurant') {
      category.categoryID = '7315'
    } else if (category.category === 'cafe') {
      category.categoryID = '9376002'
    } else if (category.category === 'pub') {
      category.categoryID = '9376003'
    } else if (category.category === 'cinema') {
      category.categoryID = '7342'
    } else if (category.category === 'nightclub') {
      category.categoryID = '9379'
    }
  }

  if (radius.radius) {
    if (radius.radius === "quarter") {
      radius.metreConversion = Math.round(0.25 * 1609.34);
    } else if (radius.radius === "half") {
      radius.metreConversion = Math.round(0.5 * 1609.34);
    } else if (radius.radius === "one") {
      radius.metreConversion = Math.round(1 * 1609.34);
    } else if (radius.radius === "three") {
      radius.metreConversion = Math.round(3 * 1609.34);
    } else if (radius.radius === "five") {
      radius.metreConversion = Math.round(5 * 1609.34);
    } else {
      radius.metreConversion = 1000;
    }
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
          url: place.poi.url
        })
      }
      
      if (nearbyDetails.length === 0) {
        setErrorMsg("No results found... please try an alternative radius or category.");
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

      let sorted = searchTwo.sort((a, b) => (b.rating.value) - (a.rating.value));
      let top5 = sorted.slice(0, 5);

      top5.forEach(place => {
        if (place.rating >= 0 && place.rating <= 0.7) {
          place.stars = Half;
        } else if (place.rating > 0.8 && place.rating <= 1.2) {
          place.stars = One;
        } else if (place.rating > 1.2 && place.rating <= 1.7) {
          place.stars = OneHalf;
        } else if (place.rating > 1.7 && place.rating <= 2.2) {
          place.stars = Two;
        } else if (place.rating > 2.2 && place.rating <= 2.7) {
          place.stars = TwoHalf;
        } else if (place.rating > 2.7 && place.rating <= 3.2) {
          place.stars = Three;
        } else if (place.rating > 3.2 && place.rating <= 3.7) {
          place.stars = ThreeHalf;
        } else if (place.rating > 3.7 && place.rating <= 4.2) {
          place.stars = Four;
        } else if (place.rating > 4.2 && place.rating <= 4.7) {
          place.stars = FourHalf;
        } else if (place.rating > 4.7 && place.rating <= 5) {
          place.stars = Five;
        } else if (place.rating.value > 5 && place.rating.value <= 5.7) {
            place.stars = FiveHalf;
        } else if (place.rating.value > 5.7 && place.rating.value <= 6.2) {
            place.stars = Six;
        } else if (place.rating.value > 6.2 && place.rating.value <= 6.7) {
            place.stars = SixHalf;
        } else if (place.rating.value > 6.7 && place.rating.value <= 7.2) {
            place.stars = Seven;
        } else if (place.rating.value > 7.2 && place.rating.value <= 7.7) {
            place.stars = SevenHalf;
        } else if (place.rating.value > 7.7 && place.rating.value <= 8.2) {
            place.stars = Eight;
        } else if (place.rating.value > 8.2 && place.rating.value <= 8.7) {
            place.stars = EightHalf;
        } else if (place.rating.value > 8.7 && place.rating.value <= 9.2) {
            place.stars = Nine;
        } else if (place.rating.value > 9.2 && place.rating.value <= 9.7) {
            place.stars = NineHalf;
        } else if (place.rating.value > 9.7 && place.rating.value <= 10) {
            place.stars = Ten;
        } else {
            place.stars = "";
        }
            
        }
      )
      
      console.log(top5);

      setNearby(top5);
      
      console.log("i'm here now");
    }
  }


  return (  
    <div className="container">
      {/* <LogoNav /> */}
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
  <option value="restaurant">Restaurant</option>
  <option value="pub">Pub</option>
  <option value="cafe">Cafe</option>
  <option value="cinema">Cinema</option>
  <option value="nightclub">Nightclub/Bar</option>
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
              </select>
              </div></div>
      
          
      <div className="search-btn">
            <button type="submit" id="search">Search</button>
          </div>
        </div>
      </form>

      <button onClick={(e) => clearSearch(e)}>Clear</button>
      

      {loading && <p>Finding...</p>}
      {midpoint.lat && <h5>The midpoint between {input.inputOne.toUpperCase()} and {input.inputTwo.toUpperCase()}:</h5>}

      <Map midpoint={midpoint} />
      {/* {loading && <p>Loading...</p>} */}
      
      <NearbySearch nearby={nearby} errorMsg={errorMsg} />

    </div>
  );
}

export default App;
