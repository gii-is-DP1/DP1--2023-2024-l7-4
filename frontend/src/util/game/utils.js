import * as CardUses from '../../cards/cardUses'

export function generateUniqueRandomNumbers() {
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1); // Crea un array de números del 1 al 50
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Selecciona un índice aleatorio
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Intercambia los elementos
    }
    return numbers;
}


export function generateNewRandomNumbers(cards0, cards1) {
    let numbers = Array.from({ length: 50 }, (_, i) => i + 1); // Crea un array de números del 1 al 50
    numbers = numbers.filter((card) => !cards0.includes(card) && !cards1.includes(card));
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Selecciona un índice aleatorio
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Intercambia los elementos
    }
    return numbers;
}

export function initialDeal(deck) {
    let deckPlayer0 = [];
    let deckPlayer1 = [];

    function isValidDeck(deck) {
        const range1 = deck.some(card => card >= 10 && card <= 18);
        const range2 = deck.some(card => card >= 19 && card <= 27);
        return range1 && range2;
    }

    let validDeal = false;

    while (!validDeal) {
        deckPlayer0 = [];
        deckPlayer1 = [];

        // Shuffle the deck
        deck = deck.sort(() => Math.random() - 0.5);

        // Deal cards to both players
        for (let i = 0; i < 8; i++) {
            deckPlayer0.push(deck.shift());
        }
        for (let i = 0; i < 8; i++) {
            deckPlayer1.push(deck.shift());
        }

        // Check if both decks are valid
        if (isValidDeck(deckPlayer0) && isValidDeck(deckPlayer1)) {
            validDeal = true;
        } else {
            // si no es válido entonces devolvemos las cartas al mazo para barajarlas de nuevo
            deck = [...deck, ...deckPlayer0, ...deckPlayer1];
        }
    }

    return [deck, deckPlayer0, deckPlayer1];
}

export function steal(deck) {
    const myDeck = deck;
    myDeck.push(deck.shift());
    return myDeck;
}


export const handleActionCard = (statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, sendModal) => {
    const card0 = statePlayer0.cardPlayed;
    const card1 = statePlayer1.cardPlayed;
    if (statePlayer0.bullets > statePlayer1.bullets) {
        handleActionSingleCard(card0, statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, sendModal);
        handleActionSingleCard(card1, statePlayer1, statePlayer0, setStatePlayer1, setStatePlayer0, sendModal);
    } else {
        handleActionSingleCard(card1, statePlayer1, statePlayer0, setStatePlayer1, setStatePlayer0, sendModal);
        handleActionSingleCard(card0, statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, sendModal);
    }
};

const handleActionSingleCard = (card, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) => {
    switch (card) {
        default:
            break;
        //case 1:
            //CardUses.executeCard1(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            //break;
        //case 2:
            //CardUses.executeCard2(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            //break;
        //case 3:
            //CardUses.executeCard3(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            //break;
        case 51:
            CardUses.executeCard51(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
    };









}