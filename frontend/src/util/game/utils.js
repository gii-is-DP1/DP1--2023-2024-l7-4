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


export const handleActionCard = (statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, deckOfCards, setDeckOfCards, sendModal) => {
    const card0 = statePlayer0.cardPlayed;
    const card1 = statePlayer1.cardPlayed;

    setStatePlayer0(prevState => ({
        ...prevState,
        recievex2damage: false,
        precisionChange: true,
        bulletsChange: true,
        intimidationCardInHand: prevState.cards.includes(45),
        failing: prevState.failing > 0 ? prevState.failing - 1 : prevState.failing,
    }));

    setStatePlayer1(prevState => ({
        ...prevState,
        recievex2damage: false,
        precisionChange: true,
        bulletsChange: true,
        intimidationCardInHand: prevState.cards.includes(45),
        failing: prevState.failing > 0 ? prevState.failing - 1 : prevState.failing,
    }));


    if (statePlayer0.bullets > statePlayer1.bullets) {
        handleActionSingleCard(card0, statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, deckOfCards, setDeckOfCards, sendModal);
        handleActionSingleCard(card1, statePlayer1, statePlayer0, setStatePlayer1, setStatePlayer0, deckOfCards, setDeckOfCards, sendModal);
    } else {
        handleActionSingleCard(card1, statePlayer1, statePlayer0, setStatePlayer1, setStatePlayer0, deckOfCards, setDeckOfCards, sendModal);
        handleActionSingleCard(card0, statePlayer0, statePlayer1, setStatePlayer0, setStatePlayer1, deckOfCards, setDeckOfCards, sendModal);
    }

};

const handleActionSingleCard = (card, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, deckOfCards, setDeckOfCards, sendModal) => {
    switch (card) {
        default:
            break;
        case 1:
            CardUses.executeCard1(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 2:
            CardUses.executeCard2(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 3:
            CardUses.executeCard3(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 4:
            CardUses.executeCard4(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 5:
            CardUses.executeCard5(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 6:
            CardUses.executeCard6(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 7:
            CardUses.executeCard7(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 8:
            CardUses.executeCard8(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 9:
            CardUses.executeCard9(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 10:
            CardUses.executeCard10(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 11:
            CardUses.executeCard11(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 12:
            CardUses.executeCard12(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 13:
            CardUses.executeCard13(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 14:
            CardUses.executeCard14(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 15:
            CardUses.executeCard15(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 16:
            CardUses.executeCard16(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 17:
            CardUses.executeCard17(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 18:
            CardUses.executeCard18(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 19:
            CardUses.executeCard19(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 20:
            CardUses.executeCard20(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 21:
            CardUses.executeCard21(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 22:
            CardUses.executeCard22(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 23:
            CardUses.executeCard23(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 24:
            CardUses.executeCard24(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 25:
            CardUses.executeCard25(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 26:
            CardUses.executeCard26(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 27:
            CardUses.executeCard27(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 28:
            CardUses.executeCard28(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 29:
            CardUses.executeCard29(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 30:
            CardUses.executeCard30(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 31:
            CardUses.executeCard31(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 32:
            CardUses.executeCard32(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 33:
            CardUses.executeCard33(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 34:
            CardUses.executeCard34(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 35:
            CardUses.executeCard35(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 36:
            CardUses.executeCard36(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 37:
            CardUses.executeCard37(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 38:
            CardUses.executeCard38(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 39:
            CardUses.executeCard39(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 40:
            CardUses.executeCard40(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 41:
            CardUses.executeCard41(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 42:
            CardUses.executeCard42(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 43:
            CardUses.executeCard43(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 44:
            CardUses.executeCard44(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 45:
            CardUses.executeCard45(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 46:
            CardUses.executeCard46(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 47:
            CardUses.executeCard47(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 48:
            CardUses.executeCard48(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 49:
            CardUses.executeCard49(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 50:
            CardUses.executeCard50(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);
            break;
        case 51:
            CardUses.executeCard51(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal);

    };

    //modalAction('')









}