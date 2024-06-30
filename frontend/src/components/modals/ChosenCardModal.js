import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import CardButton from '../buttons/cardButton';

const ChooseCardModal = ({ isOpen, deckOfCards = [], chooseCard, handlePickCard, handleDiscardRemaining }) => {
    const [chosenCard, setChosenCard] = useState(null);

    const handleCardClick = (card) => {
        setChosenCard(card);
    };

    const handleConfirmClick = () => {
        handlePickCard(chosenCard);
        handleDiscardRemaining(deckOfCards.filter(card => !deckOfCards.slice(0, chooseCard).includes(card)));
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
                        imgSrc={`${process.env.PUBLIC_URL}/cards/card${card}.png`}
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
