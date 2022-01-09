import React, {useState} from 'react';
// import GoogleMapReact from 'google-map-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Star from '../../src/images/star.png';

export default function Map({ midpoint }) {

const starIcon = new L.Icon({
  iconUrl: Star,
  iconSize: [40, 40],
  className: 'leaflet-star-icon'
});

  const [map, setMap] = useState(false);

  if (map) {
    map.flyTo(midpoint, 13, {
      duration: 1
    });
    // setMarkerPoint(midpoint);
    // console.log(markerPoint);
  }

  
  return (
    <div className='map-container'>
      {midpoint.lat && (<MapContainer
        center={[51.5168712, -0.1456173]}
        zoom={13}
        whenCreated={setMap}
        scrollWheelZoom={false}>
        {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[midpoint.lat, midpoint.lng]}
          icon={starIcon}>
        </Marker>
      </MapContainer>)}
    </div>
  )
}