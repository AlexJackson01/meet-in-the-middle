import React, { useEffect, useState } from "react";
import './App.css';
import MapContainer from "./components/MapContainer";
import NearbySearch from "./components/NearbySearch";

function App() {
  let [location, setLocation] = useState("");
  let [latLng, setLatLon] = useState([{ lat: "", lng: ""}])
  let [infoBox, setInfoBox] = useState("");
  let [nearby, setNearby] = useState("");

  const key = "AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI";
  
  latLng.lat = Number(latLng.lat);
  latLng.lng = Number(latLng.lng);


  const getCoordinates = (e) => {
    e.preventDefault();

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`, {
      "method": "GET",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then(response => {
        console.log(response);
        setLatLon({ lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng });
        setInfoBox(response.results[0].formatted_address);
        console.log(infoBox);
        getNearby();
      })
      .catch(err => console.log(err))
  }

  const getNearby = (e) => {
    // e.preventDefault();

    fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&radius=1500&key=${key}`, {
      "method": "GET",
      "mode": "no-cors",
      "headers": {
        "Access-Control-Allow-Origin": "*",
      }
      // "mode": "same-origin",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then(response => {
        console.log(response);
        setNearby(response.results[0]);
        console.log(nearby);
      })
      .catch(err => console.log(err))
}


  return (  
    <div className="container">
      <h1>Meet in the Middle</h1>
      <div className="form-group">
      <form onSubmit={(e) => getCoordinates(e)}>
        <label>Location:</label>
        <input type="text" className="form-control" name="location" value={location} onChange={(e) => setLocation(e.target.value) }></input>
        <button type="submit">Search</button>
        </form>
        <button onClick={(latLng) => getNearby(latLng)}>Find Nearby</button>
      </div>
      
      <MapContainer latLng={latLng} infoBox={infoBox} />
      <NearbySearch nearby={nearby} />
    </div>
  );
}

export default App;
