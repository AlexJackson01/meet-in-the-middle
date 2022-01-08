import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import MapContainer from "./components/MapContainer";
import NearbySearch from "./components/NearbySearch";

function App() {
  let [loading, setLoading] = useState(false);
  let [location, setLocation] = useState("");
  let [latLng, setLatLng] = useState({
    lat: "", lng: "", address: ""
  });
  let [nearby, setNearby] = useState([]);

  const key = "AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI";

  const handleChange = e => {
    setLocation(e.target.value);
  }

  const handleSubmit = e => {
  // handle form submit
  e.preventDefault();
    setLoading(true);
    getDetails();
  setLoading(false);
  };

  useEffect(() => {
    getCoordinates();
  }, [location]);

  const getCoordinates = async () => {
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`, {
        "method": "GET",
    })
      .then(response => response.json())
      .then(res => setLatLng({
        lat: res.results[0].geometry.location.lat,
        lng: res.results[0].geometry.location.lng,
        address: res.results[0].formatted_address
    }))
  }

  // console.log(latLng);

  async function getDetails() {        
      const res2 = await fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&radius=100&key=${key}`, {
        "method": "GET",
        "headers": {
          "x-cors-grida-api-key": "f73e0aad-aaf2-4494-8d33-b63bb254d2d3",
        }
      });
      
    const result2 = await res2.json();
    
    const nearbyPlace = result2.results;
    nearbyPlace.shift();
    setNearby(nearbyPlace);      
      // for (let i = 1; i < 20; i++) {
      //   setNearby(nearby => [
      //     ...nearby,
      //     {
      //       name: result2.results[i].name,
      //       address: result2.results[i].vicinity,
      //       photo: result2.results[i].photos[0].html_attributions[0],
      //       rating: result2.results[i].rating
      //     }
      //   ]);
      // }
      
      // console.log(nearby);
    };

  return (  
    <div className="container">
      <h1>Meet in the Middle</h1>
      <div className="form-group">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Location:</label>
        <input type="text" className="form-control" name="location" value={location} onChange={(e) => handleChange(e)}></input>
        <button type="submit">Search</button>
        </form>
      </div>
      
      <MapContainer latLng={latLng} />
      <NearbySearch nearby={nearby} />

    </div>
  );
}

export default App;
