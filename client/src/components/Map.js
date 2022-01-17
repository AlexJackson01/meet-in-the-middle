import React, {useState, useEffect} from 'react';
// import GoogleMapReact from 'google-map-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Star from '../../src/star.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Map({ midpoint, markers, user }) {

useEffect(() => {
  getMarkerPoints()
}, [midpoint])
  
  
  const starMidIcon = new L.Icon({
    iconUrl: Star,
    iconSize: [40, 40],
    className: 'leaflet-star-icon'
  });

  const starNearbyIcon = new L.Icon({
    iconUrl: Star,
    iconSize: [20, 20],
    className: 'leaflet-star-icon'
  });

    let markerPoints = [
      { "name": "This is your midpoint.", "position": [midpoint.lat, midpoint.lng]}
    ];


  const getMarkerPoints = () => {
    if (markers) {
      markers.forEach(marker => markerPoints.push({ "name": marker[2], "position": [marker[0], marker[1]] }))
      console.log(markerPoints);
    }
  }
  
  


  const [map, setMap] = useState(false);

  if (map) {
    map.flyTo(midpoint, 13, {
      duration: 1
    });
    // setMarkerPoint(midpoint);
    // console.log(markerPoint);
  }

  // L.marker([midpoint.lat, midpoint.lng], {icon: starMidIcon}).addTo(TileLayer).bindPopup("This is your midpoint.");

  
  return (
    <div className='map-container'>
      {!user && <h5>To view more information, please <a href="/">login</a>.</h5>}
      {user && midpoint.lat && (<MapContainer
        center={[51.5168712, -0.1456173]}
        zoom={13}
        whenCreated={setMap}
        scrollWheelZoom={false}>
        {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { markers && markers.map((item, index) => (
        <Marker
            key={index}
            index={index}
            position={item.position}
            icon={item.name === "This is your midpoint." ? starMidIcon : starNearbyIcon}
        >
        <Popup>
              <p className='map-popup'><b>{item.name}</b> {item.address}</p>
        </Popup>
        </Marker>
        ))}

      </MapContainer>)}
    </div>
  )
}