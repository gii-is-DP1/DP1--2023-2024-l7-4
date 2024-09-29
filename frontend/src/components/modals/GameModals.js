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
    setShowConfirmationDiscardToPrevent,
    showAbandonedModal,
    advertiseTimeLimit,
    handleCasualLeaves,
    
}) => {

    const handleCancelActionCard30 = () => {
        handleSendDeckMessage('PLAYEDCARD', 30)
        setShowConfirmationDiscardToPrevent(false);
    };

    const handleConfirmActionCard30 = () => {
        handleSendDeckMessage('PLAYEDCARD30', 30)
        setShowConfirmationDiscardToPrevent(false);
    };

    const handleLeave = () => {
        window.location.href = "/";
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
                        playerNumber !== 1 && playerNumber !== 0 ? (statePlayer0.health < 0 ? 'PLAYER 0 LOST' : 'PLAYER 1 LOST') : 'YOU LOST :('}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleGoToLobby}>Go to lobby</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={showAbandonedModal}>
                <ModalHeader>PLAYER LEFT</ModalHeader>
                <ModalBody>
                    The enemy has left the game, you won it!!!
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleLeave}>Go to lobby</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={advertiseTimeLimit > 0}>
                <ModalHeader>{advertiseTimeLimit === 1 ? "TIME LIMIT CLOSE!!" : "TIME'S UP"}</ModalHeader>
                <ModalBody>
                    {advertiseTimeLimit === 1 ? "You have only 40 seconds to play " : "TIME'S UP"}               
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleCasualLeaves}>
                    {advertiseTimeLimit === 1?"Accept":"Go to lobby"}
                    </Button>
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
