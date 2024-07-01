import React from 'react';
import CardButton from '../buttons/cardButton';

const CardRow = ({ player, cards, handleSetCardPlayed, handleMouseEnter }) => {
    return (
        <div className="bottom-row">
            {cards.map((card, index) => (
                <CardButton
                    key={index}
                    className="large-button"
                    onClick={() => handleSetCardPlayed(player, index)}
                    imgSrc={`${process.env.PUBLIC_URL}/cards/card${card}.png`}
                    onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${card}.png`)}
                />
            ))}
            <CardButton
                className="large-button"
                onClick={() => handleSetCardPlayed(player, 51)}
                imgSrc={`${process.env.PUBLIC_URL}/cards/card51.png`}
                onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card51.png`)}
            />
        </div>
    );
};

export default CardRow;