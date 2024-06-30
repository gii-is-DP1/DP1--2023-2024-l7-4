import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import DiscardCardsModalContent from '../modals/DiscardCardsModalContent';
import ChooseCardModal from '../modals/ChosenCardModal';

const GameModals = ({
    showConfirmationModal,
    handleActionConfirmed,
    readyForDiscard,
    playerNumber,
    statePlayer0,
    statePlayer1,
    discardedCards,
    handleSetDiscardCard,
    handleMouseEnter,
    handleDiscardConfirmed,
    showEndModal,
    handleGoToLobby,
    chooseCard,
    deckOfCards,
    handlePickCard,
    handleDiscardRemaining
}) => {
    return (
        <>
            <Modal isOpen={showConfirmationModal}>
                <ModalHeader>Next turn</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleActionConfirmed}>Confirm</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={readyForDiscard}>
                <ModalHeader>Discard two cards</ModalHeader>
                <ModalBody>
                    {playerNumber === 0 ? (
                        <DiscardCardsModalContent
                            cards={statePlayer0.cards}
                            discardedCards={discardedCards}
                            handleSetDiscardCard={(index) => handleSetDiscardCard(0, index)}
                            handleMouseEnter={handleMouseEnter}
                        />
                    ) : (
                        <DiscardCardsModalContent
                            cards={statePlayer1.cards}
                            discardedCards={discardedCards}
                            handleSetDiscardCard={(index) => handleSetDiscardCard(1, index)}
                            handleMouseEnter={handleMouseEnter}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    {discardedCards.length === 2 && (<Button color="danger" onClick={handleDiscardConfirmed}>Discard</Button>)}
                </ModalFooter>
            </Modal>
            <Modal isOpen={showEndModal}>
                <ModalHeader>THE GAME HAS ENDED</ModalHeader>
                <ModalBody>
                    {(playerNumber === 0 && statePlayer0.health > 0) || (playerNumber === 1 && statePlayer1.health > 0) ? 'YOU WON!!' : 'YOU LOST :('}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleGoToLobby}>Go to lobby</Button>
                </ModalFooter>
            </Modal>
            <ChooseCardModal
                isOpen={chooseCard !== 0}
                deckOfCards={deckOfCards}
                chooseCard={chooseCard}
                handlePickCard={handlePickCard}
                handleDiscardRemaining={handleDiscardRemaining}
            />
        </>
    );
};

export default GameModals;
