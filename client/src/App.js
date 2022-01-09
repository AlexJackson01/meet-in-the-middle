import React, { useEffect, useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
// import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch";

function App() {
  let [loading, setLoading] = useState(false);
  let [location, setLocation] = useState({
    locationOne: "", locationTwo: ""
  });
  // let [locationTwo, setLocationTwo] = useState("");
  let [coordinates, setCoordinates] = useState({
    latOne: "", latTwo: "", lngOne: "", lngTwo: ""
  })
  let [midpoint, setMidpoint] = useState({
    lat: "", lng: ""
  });
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
    setLoading(true);
    getCoordinates();
    // getMidpoint();
    // getDetails();
    setLoading(false);
  };

  const clearForm = () => {
    setLocation("");
  }

  useEffect(() => {
    getCoordinates();
  }, [nearby]);

  const getCoordinates = async () => {
    const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.locationOne}&key=${key}`, {
        "method": "GET",
    })
      
    const result1 = await res1.json();

    // console.log(coordinates);
    
    const res2 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.locationTwo}&key=${key}`, {
    "method": "GET",
    })
    const result2 = await res2.json();
    setCoordinates({
      latOne: result1.results[0].geometry.location.lat,
      lngOne: result1.results[0].geometry.location.lng,
      latTwo: result2.results[0].geometry.location.lat,
      lngTwo: result2.results[0].geometry.location.lng
    })
    let midLat = ((coordinates.latOne + coordinates.latTwo) / 2).toFixed(8);
    let midLng = ((coordinates.lngOne + coordinates.lngTwo) / 2).toFixed(8);
    setMidpoint({ lat: midLat, lng: midLng });
    getDetails();
  }

  // // console.log(latLng);

  async function getDetails() {        
      const res2 = await fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpoint.lat},${midpoint.lng}&radius=1000&key=${key}`, {
        "method": "GET",
        "headers": {
          "x-cors-grida-api-key": "f73e0aad-aaf2-4494-8d33-b63bb254d2d3",
        }
      });
      
    const result2 = await res2.json();
    
    const nearbyPlace = result2.results;
    nearbyPlace.shift();
    setNearby(nearbyPlace);
    };

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
            <button type="submit">Search</button>
            <button onClick={(e) => clearForm(e)}>Clear</button>
          </div>
        </div>
        </form>
      


 
      <Map midpoint={midpoint} />
      {loading && <p>Loading...</p>}
      
      <NearbySearch nearby={nearby} />

    </div>
  );
}

export default App;
