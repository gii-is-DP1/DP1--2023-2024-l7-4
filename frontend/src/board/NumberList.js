// NumberList.jsx
import React from 'react';

const NumberList = ({ numbers, onNumberClick }) => {
  return (
    <div className="number-list">
      <ul className='ull'>
        {numbers.map((number, index) => (
          <li className='lii' key={index} onClick={() => onNumberClick(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;
