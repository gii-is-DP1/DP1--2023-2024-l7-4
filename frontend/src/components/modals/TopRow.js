import React from 'react';
import CardButton from '../buttons/cardButton';

const TopRow = () => {
    const cardButtons = Array(7).fill(0).map((_, index) => (
        <CardButton
            key={index}
            className="small-button"
            imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
        />
    ));

    return (
        <div className="top-row">
            {cardButtons}
        </div>
    );
};

export default TopRow;