import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
// import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch"; 

function App() {
  // let [loading, setLoading] = useState(false);
  let [location, setLocation] = useState({
    locationOne: "", locationTwo: ""
  });
  let [coordinatesOne, setCoordinatesOne] = useState()
  let [coordinatesTwo, setCoordinatesTwo] = useState()
  let [midpoint, setMidpoint] = useState({lat: "", lng: ""});
  let [nearby, setNearby] = useState([]);

  const key = "AIzaSyBdetXeEWeswh45iwugkadq_FQHitpLnhQ";

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setLocation(state => ({
      ...state,
      [name]: value
    }))
  }


  const handleSubmit = e => {
  // handle form submit
    e.preventDefault();
    // setLoading(true);
    getCoordinates();
    // setLoading(false);
  };

  const clearForm = () => {
    setLocation("");
  }

  // useEffect(() => {
  //   getDetails();
  // }, [nearby]);

  const getCoordinates = () => {
    Promise.all([
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.locationOne}&key=${key}`, {
        "method": "GET",
      }),
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.locationTwo}&key=${key}`, {
        "method": "GET",
      })
    ])
      .then(responses => {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(response => {
          return response.json();
        }));
      })
      .then(data => {
        // console.log(data[0].results[0].geometry.location)
        setCoordinatesOne(data[0].results[0].geometry.location)
        setCoordinatesTwo(data[1].results[0].geometry.location)
        document.getElementById('search').click()
        let midLat = ((coordinatesOne.lat + coordinatesTwo.lat) / 2).toFixed(8)
        let midLng = ((coordinatesOne.lng + coordinatesTwo.lng) / 2).toFixed(8)
        setMidpoint({ lat: midLat, lng: midLng })
        getNearby()
      })
      .catch(error => {
        // if there's an error, log it
        console.log(error);
      })
  };

  const getNearby = () => {
    fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpoint.lat},${midpoint.lng}&radius=1000&key=${key}`, {
      "method": "GET",
      "headers": {
        "x-cors-grida-api-key": "f73e0aad-aaf2-4494-8d33-b63bb254d2d3",
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then(response => {
        const nearbyPlaces = response.results;
        nearbyPlaces.shift();
        setNearby(nearbyPlaces);
      })
  }

  return (  
    <div className="container">
      {/* <LogoNav /> */}
    <h1>Meet in the Middle</h1>


      {/* STYLED FORM */}
      <form className="container input-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
      <div className="row col-lg-4 col-xs-4 col-sm-4">
        <div className="form-group">
        <label>Location One:</label>
              <input type="text" className="form-control input-group-lg header" width={150} name="locationOne" value={location.locationOne} onChange={(e) => handleChange(e)}></input>
            </div>
          </div>
      <div className="col-lg-4 col-xs-4 col-sm-4">
      <div className="form-group">
        <label>Location Two:</label>
              <input type="text" className="form-control input-group-lg header" name="locationTwo" value={location.locationTwo} onChange={(e) => handleChange(e)}></input>
            </div>
            </div>
      <div className="search-btn">
            <button type="submit" id="search">Search</button>
            <button onClick={(e) => clearForm(e)}>Clear</button>
          </div>
        </div>
        </form>
      


 
      <Map midpoint={midpoint} />
      {/* {loading && <p>Loading...</p>} */}
      
      <NearbySearch nearby={nearby} />

    </div>
  );
}

export default App;
