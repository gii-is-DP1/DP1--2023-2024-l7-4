import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card } from 'reactstrap';
import DiscardCardsModalContent from '../modals/DiscardCardsModalContent';
import ChooseCardModal from '../modals/ChosenCardModal';

const GameModals = ({
    showConfirmationModal,
    handleActionConfirmed,
    readyForDiscard,
    playerNumber,
    statePlayer0,
    statePlayer1,
    setStatePlayer0,
    setStatePlayer1,
    discardedCards,
    handleSetDiscardCard,
    handleMouseEnter,
    handleDiscardConfirmed,
    showEndModal,
    handleGoToLobby,
    chooseCard,
    setChooseCard,
    deckOfCards,
    setDeckOfCards,
    handleSendDeckMessage,
    showConfirmationDiscardToPrevent,
    setShowConfirmationDiscardToPrevent
}) => {

    const handleCancelActionCard30 = () => {
        handleSendDeckMessage('PLAYEDCARD', 30)
        setShowConfirmationDiscardToPrevent(false);
    };

    const handleConfirmActionCard30 = () => {
        handleSendDeckMessage('PLAYEDCARD30', 30)
        setShowConfirmationDiscardToPrevent(false);
    };
    return (
        <>
            <Modal isOpen={showConfirmationModal && chooseCard === 0}>
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
            <Modal isOpen={showConfirmationDiscardToPrevent}>
                <ModalHeader> DISCARD CONFIRMATION </ModalHeader>
                <ModalBody> DO YOU WANT TO DISCARD 2 CARDS TO PREVENT THE DAMAGE? </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleCancelActionCard30}> NO </Button>
                    <Button color="danger" onClick={handleConfirmActionCard30}> YES </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={showEndModal}>
                <ModalHeader>THE GAME HAS ENDED</ModalHeader>
                <ModalBody>
                    {(playerNumber === 0 && statePlayer0.health > 0) || (playerNumber === 1 && statePlayer1.health > 0) ? 'YOU WON!!' : 
                    playerNumber !== 1 && playerNumber !== 0?(statePlayer0.health < 0? 'PLAYER 0 LOST': 'PLAYER 1 LOST'): 'YOU LOST :('}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleGoToLobby}>Go to lobby</Button>
                </ModalFooter>
            </Modal>
            <ChooseCardModal
                isOpen={chooseCard !== 0}
                deckOfCards={deckOfCards}
                chooseCard={chooseCard}
                handleSendDeckMessage={handleSendDeckMessage}
                playerNumber={playerNumber}
                setStatePlayer0={setStatePlayer0}
                setStatePlayer1={setStatePlayer1}
                setDeckOfCards={setDeckOfCards}
                setChooseCard={setChooseCard}
            />
        </>
    );
};

export default GameModals;
