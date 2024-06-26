import React from 'react';
import CardButton from '../buttons/cardButton';

const DiscardCardsModalContent = ({ cards, discardedCards, handleSetDiscardCard, handleMouseEnter }) => {
    return (
        <>
            {cards.map((card, index) => (
                <CardButton
                    key={index}
                    className="large-button"
                    onClick={() => handleSetDiscardCard(index)}
                    imgSrc={discardedCards.includes(card) ? `${process.env.PUBLIC_URL}/cards/backface.png` : `${process.env.PUBLIC_URL}/cards/card${card}.png`}
                    onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${card}.png`)}
                />
            ))}
        </>
    );
};

export default DiscardCardsModalContent;