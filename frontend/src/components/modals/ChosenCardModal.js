import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import CardButton from '../buttons/cardButton';

const ChooseCardModal = ({ isOpen, deckOfCards = [], chooseCard = 3, handleSendDeckMessage, playerNumber, setStatePlayer0, setStatePlayer1, setDeckOfCards, setChooseCard }) => {
    const [chosenCard, setChosenCard] = useState(null);
    const [remainingCards, setRemainingCards] = useState([]);
    
    useEffect(() => {
        if (remainingCards.length > 0) {
            handleSendDeckMessage('CUSTOM', playerNumber);
            setChooseCard(0);
        }
    }, [remainingCards]);

    const handleCardClick = (card) => {
        setChosenCard(prevCard => (prevCard === card ? null : card));
    };

    const handleConfirmPickCard = (chosenCard, remainingCards) => {
        if (playerNumber === 0) {
            setStatePlayer0(prevState => ({
                ...prevState,
                cards: [...prevState.cards, chosenCard]
            }));
        } else {
            setStatePlayer1(prevState => ({
                ...prevState,
                cards: [...prevState.cards, chosenCard]
            }));
        }
    };

    const handleConfirmClick = () => {
        const updatedRemainingCards = deckOfCards.filter(card => !deckOfCards.slice(0, chooseCard).includes(card) );
        setDeckOfCards(updatedRemainingCards);
        setRemainingCards(updatedRemainingCards);
        handleConfirmPickCard(chosenCard, updatedRemainingCards);
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Pick one card</ModalHeader>
            <ModalBody>
                {deckOfCards.slice(0, chooseCard).map((card, index) => (
                    <CardButton
                        key={index}
                        className="large-button"
                        onClick={() => handleCardClick(card)}
                        imgSrc={chosenCard === card ? `${process.env.PUBLIC_URL}/cards/backface.png` : `${process.env.PUBLIC_URL}/cards/card${card}.png`}
                    />
                ))}
            </ModalBody>
            <ModalFooter>
                {chosenCard && (
                    <Button color="danger" onClick={handleConfirmClick}>
                        Confirm
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );
};

export default ChooseCardModal;