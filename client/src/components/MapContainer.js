import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

export default function MapContainer({ latLng }) {
  const mapStyles = {        
    height: "50vh",
      width: "75%",
        margin: "auto"
    };
    
  const [ selected, setSelected ] = useState(false);

    
    // console.log(latLng);
    return (
        <div>
            {selected && (<p>Your location is: {latLng.address}</p>)}
        <LoadScript
       googleMapsApiKey='AIzaSyC3pbLs1mweo2wuMBSv6cqNjQiC0kEpHoI'>
        <GoogleMap
          className="map"
          mapContainerStyle={mapStyles}
          zoom={13}
          center={latLng}
                >
                
        {<Marker
            position={latLng}
            onClick={() => setSelected(!false)} />}

        </GoogleMap>
     </LoadScript>
        </div>
    )
}
