import React, { useState, useEffect } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
// import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch"; 

function App() {
  // let [loading, setLoading] = useState(false);
  let [input, setInput] = useState({ inputOne: "", inputTwo: "" });
  let [category, setCategory] = useState({ category: "", categoryID: "" });
  let [nearby, setNearby] = useState("");
  // let [points, setPoints] = useState()
  let [midpoint, setMidpoint] = useState({lat: "", lng: ""});
  let [extendedID, setExtendedID] = useState([]);

  useEffect(() => {
    getNearby()
  }, [midpoint])

  // const key = "AIzaSyBdetXeEWeswh45iwugkadq_FQHitpLnhQ";

  const geoKey = "5b3ce3597851110001cf6248d8248e64cce24e7bae3637d381b685f1";
  // const nearbyKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";
  const nearbyKey = "MpOfnHZhRSBv9wbqjqhYWvYAMWkaFeup";
  const nearbyConfig = {
    method: "get",
    url: `https://api.tomtom.com/search/2/nearbySearch/.json?key=${nearbyKey}&lat=${midpoint.lat}&lon=${midpoint.lng}&radius=10000&limit=20&language=en-GB&categorySet=${category.categoryID}`
  }
  // let nearby = [];

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
    // setLoading(true);
    getCoordinates();
    // setLoading(false);
  };

  const clearForm = (e) => {
    setInput([]);
  };
  
  const clearSearch = () => {
    nearby = [];
    setMidpoint([]);
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

  const getNearby = () => {
    console.log("i'm here");
    console.log(midpoint);
    if (midpoint.lat !== "") {
      axios(nearbyConfig)
        .then(response => {
          console.log("XX", response);
          setNearby(response.data.results);
          // nearby.push(response.data.results);
          console.log(nearby);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  return (  
    <div className="container">
      {/* <LogoNav /> */}
    <h1>Meet in the Middle</h1>


      {/* STYLED FORM */}
      <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">

      <div className="row col-lg-4 col-xs-4 col-sm-4">
        <div className="form-group">
        <label>Location One:</label>
              <input type="text" className="form-control input-group-lg header" width={150} name="inputOne" placeholder="Please enter an address, location or postal code" value={input.inputOne} onChange={(e) => handleChange(e)}></input>
            </div>
          </div>

      <div className="col-lg-4 col-xs-4 col-sm-4">
      <div className="form-group">
        <label>Location Two:</label>
              <input type="text" className="form-control input-group-lg header" name="inputTwo" placeholder="Please enter an address, location or postal code" value={input.inputTwo} onChange={(e) => handleChange(e)}></input>
            </div>
          </div>
          
      <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="form-group">
              <label>Type:</label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory({category: selectedCategory})
              }}>
  <option defaultValue>Select a place type</option>
  <option value="restaurant">Restaurant</option>
  <option value="pub">Pub</option>
  <option value="cafe">Cafe</option>
  <option value="cinema">Cinema</option>
  <option value="nightclub">Nightclub/Bar</option>
              </select>
              </div></div>
      
          
      <div className="search-btn">
            <button type="submit" id="search">Search</button>
          </div>
        </div>
      </form>
      <button onClick={(e) => clearSearch(e)}>Clear</button>
      


      {/* {nearby && <h5>The midpoint between {input.inputOne.toUpperCase()} and {input.inputTwo.toUpperCase()}:</h5>} */}
      {/* {points.type && <h5>The {points.type} at your midpoint:</h5>} */}
      <Map midpoint={midpoint} />
      {/* {loading && <p>Loading...</p>} */}
      
      <NearbySearch nearby={nearby} />

    </div>
  );
}

export default App;
