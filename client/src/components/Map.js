import React, {useState, useEffect} from 'react';
// import GoogleMapReact from 'google-map-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

let defaultStyle = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
}

export default function Map({ midpoint }) {

  let [markerPoint, setMarkerPoint] = useState("");

  const [map, setMap] = useState(null);

  if (map) {
    map.flyTo(midpoint, 13);
    // setMarkerPoint(midpoint);
    // console.log(markerPoint);
  }

// function ChangeView({
//    center,
//    zoom
// }) {
//    const map = useMap();
//    map.setView(center, zoom);
//    return null;
// }

  // fly(midpoint);
  
  return (
    <div className='map-container'>
      <MapContainer
        center={[51.5144657, -0.1700381]}
        zoom={13}
        whenCreated={setMap}
        scrollWheelZoom={false}>
        {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[midpoint.lat, midpoint.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}





  
  // const Marker = ({ text }) => <div>{text}</div>;

    
  // console.log(latLng);






      {/* {selected && (<p>Your location is: </p>)}
              <div style={{ height: '100vh', width: '100%' }}>
          {midpoint && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI" }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={defaultStyle.zoom}
              center={{ Lat: midpoint.lat, lng: midpoint.lng }}
            
            >
              <Marker
                lat={midpoint.lat}
                lng={midpoint.lng}
                text="My Marker"
              />
            </GoogleMapReact>
          )} */}





//         {/* <LoadScript
//       resetBoundsOnResize
//        googleMapsApiKey='AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI'>
//         <GoogleMap
//           className="map"
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={midPoint}
//                 >
                
//         {<Marker
//             position={midPoint}
//             onClick={() => setSelected(!false)} />}

//         </GoogleMap>
//      </LoadScript> */}
// 