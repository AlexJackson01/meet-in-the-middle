import React, {useState} from 'react'

export default function NearbySearch({ nearby }) {
    let [showAddress, setShowAddress] = useState(false);
    return (
        <div>
          {nearby.map((place, i) => (
            <div key={i} className="student-list">
              <li onClick={() => setShowAddress(true)}>
                {/* {place.photos[0].html_attributions[0]} */}
                {place.name} - {place.rating}
                {showAddress && (<p>{place.vicinity}</p>)}
              </li>

            </div>
          ))}
        </div>
    )
}
