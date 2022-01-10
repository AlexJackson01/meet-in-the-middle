import React, { useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
// import LogoNav from "./components/LogoNav";
import Map from "./components/Map";
import NearbySearch from "./components/NearbySearch"; 

function App() {
  // let [loading, setLoading] = useState(false);
  let [input, setInput] = useState({ inputOne: "", inputTwo: "" });
  let [type, setType] = useState({placeType: "", typeID: ""})
  // let [points, setPoints] = useState({pointOne: "", pointTwo: ""})
  // let [coordinatesOne, setCoordinatesOne] = useState()
  // let [coordinatesTwo, setCoordinatesTwo] = useState()
  let [midpoint, setMidpoint] = useState({lat: "", lng: ""});
  let [POI, setPOI] = useState([]);
  let [extendedID, setExtendedID] = useState([]);

  // const key = "AIzaSyBdetXeEWeswh45iwugkadq_FQHitpLnhQ";

  const geoKey = "5b3ce3597851110001cf6248d8248e64cce24e7bae3637d381b685f1";
  const poiKey = "LGM32rZnrmDbAgGhjwXpqAbNNZ0HnhqV";

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
    setInput({inputOne: "", inputTwo: ""});
  };
  
  const clearSearch = () => {
    setPOI([]);
    setMidpoint({lat: "", lng: ""});
  }

  if (type.placeType) {
    if (type.placeType === 'restaurant') {
      type.typeID = '7315'
    } else if (type.placeType === 'cafe') {
      type.typeID = '9376002'
    } else if (type.placeType === 'pub') {
      type.typeID = '9376003'
    } else if (type.placeType === 'cinema') {
      type.typeID = '7342'
    } else if (type.placeType === 'nightclub') {
      type.typeID = '9379'
    }
  }

  const getCoordinates = async () => {
    Promise.all([
      await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputOne}`, {
        "method": "GET",
      }),
      await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${geoKey}&text=${input.inputTwo}`, {
        "method": "GET",
      })
    ])
      .then(responses => {
        return Promise.all(responses.map(response => {
          return response.json();
        }))
      })
      .then(data => {
        setMidpoint({
          lat: ((data[0].features[0].geometry.coordinates[1] + data[1].features[0].geometry.coordinates[1]) / 2).toFixed(8),
          lng: ((data[0].features[0].geometry.coordinates[0] + data[1].features[0].geometry.coordinates[0]) / 2).toFixed((8))
        })
        // getPOI();
      })
    .then(getPOI())
  }

  const getPOI = async () => {
    await fetch(`https://api.tomtom.com/search/2/poiSearch/${type.placeType}.json?key=${poiKey}&limit=20&lat=${midpoint.lat}&lon=${midpoint.lng}&radius=100000&language=en-GB&categoryset=${type.typeID}`, {
      "method": "GET",
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPOI(data.results);
        // setExtendedID(data.results);
      })
  }

  // const getCoordinates = async() => {
  //   Promise.resolve([
  //     await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${input.inputOne}&key=${key}`, {
  //       "method": "GET",
  //     }),
  //     await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${input.inputTwo}&key=${key}`, {
  //       "method": "GET",
  //     })
  //   ])
  //     .then(responses => {
  //       // Get a JSON object from each of the responses
  //       return Promise.all(responses.map(response => {
  //         return response.json();
  //       }));
  //     })
  //     .then(data => {
  //       // console.log(data[0].results[0].geometry.location)
  //       setCoordinatesOne(data[0].results[0].geometry.location)
  //       setCoordinatesTwo(data[1].results[0].geometry.location)
  //       setPoints({pointOne: input.inputOne, pointTwo: input.inputTwo})
  //       document.getElementById('search').click()
  //       let midLat = ((coordinatesOne.lat + coordinatesTwo.lat) / 2).toFixed(8)
  //       let midLng = ((coordinatesOne.lng + coordinatesTwo.lng) / 2).toFixed(8)
  //       setMidpoint({ lat: midLat, lng: midLng })
  //       getNearby()
  //     })
  //     .catch(error => {
  //       // if there's an error, log it
  //       console.log(error);
  //     })
  // };

  // const getNearby = () => {
  //   fetch(`https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpoint.lat},${midpoint.lng}&radius=1000&key=${key}`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-cors-grida-api-key": "f73e0aad-aaf2-4494-8d33-b63bb254d2d3",
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json()
  //       } else {
  //         throw new Error("Not 2xx response");
  //       }
  //     })
  //     .then(response => {
  //       const nearbyPlaces = response.results;
  //       nearbyPlaces.shift();
  //       setNearby(nearbyPlaces);
  //       clearForm(); // when form is cleared, it tries to geocode again?? Not sure why
  //     })
  // }

  // console.log(nearby);

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
                const selectedType = e.target.value;
                setType({placeType: selectedType})
              }}>
  <option selected>Select a place type</option>
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
      


      {/* {nearby[0] && <h5>The midpoint between {points.pointOne.toUpperCase()} and {points.pointTwo.toUpperCase()}:</h5>} */}
      {/* {points.type && <h5>The {points.type} at your midpoint:</h5>} */}
      <Map midpoint={midpoint} />
      {/* {loading && <p>Loading...</p>} */}
      
      <NearbySearch POI={POI} key={poiKey} />

    </div>
  );
}

export default App;
