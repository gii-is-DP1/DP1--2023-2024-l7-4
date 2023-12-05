import React from 'react';

const LocationList = ({ onSelect, availableLocations }) => {
  return (
    <div className="location-list">
      <ul className='ullocation'>
        {availableLocations.map((location, index) => (
          <li className='lilocation' key={index} onClick={() => onSelect(location)}>
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;