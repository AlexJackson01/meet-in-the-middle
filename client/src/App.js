import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch";

function App() {
  let [loading, setLoading] = useState(false);
  let [locationOne, setLocationOne] = useState("");
  let [locationTwo, setLocationTwo] = useState("");
  let [coordinates, setCoordinates] = useState({
    latOne: "", latTwo: "", lngOne: "", lngTwo: ""
  })
  let [midpoint, setMidpoint] = useState({
    lat: "", lng: ""
  });
  let [nearby, setNearby] = useState([]);

  const key = "AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI";

  const handleChangeOne = e => {
    setLocationOne(e.target.value);
  }

  const handleChangeTwo = e => {
  setLocationTwo(e.target.value);
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

  // const flyTo = () => {
  //   const { current = {} } = mapRef;
  //   const { leafletElement: map } = current;

  //   map.flyTo([midpoint.lat, midpoint.lng], 14, {
  //     duration: 2
  //   });
  // }

  useEffect(() => {
    getCoordinates();
  }, [midpoint]);

  const getCoordinates = async () => {
    const res1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationOne}&key=${key}`, {
        "method": "GET",
    })
      
    const result1 = await res1.json();

    // console.log(coordinates);
    
    const res2 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationTwo}&key=${key}`, {
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
    // setMarkerPoint([midpoint.lat, midpoint.lng]);
    // flyTo();
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
    // console.log(nearbyPlace);
    nearbyPlace.shift();
    setNearby(nearbyPlace);
    };

  return (  
    <div className="container">
      <h1>Meet in the Middle</h1>
      <div className="form-group">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Location One:</label>
        <input type="text" className="form-control" name="location" value={locationOne} onChange={(e) => handleChangeOne(e)}></input>
        <label>Location Two:</label>
        <input type="text" className="form-control" name="location" value={locationTwo} onChange={(e) => handleChangeTwo(e)}></input>
        <button type="submit">Search</button>
        </form>
      </div>

 
      <Map midpoint={midpoint} />
      {loading && <p>Loading...</p>}
      
      <NearbySearch nearby={nearby} />

    </div>
  );
}

export default App;
