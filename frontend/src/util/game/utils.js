export function generateUniqueRandomNumbers() {
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1); // Crea un array de números del 1 al 50
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Selecciona un índice aleatorio
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Intercambia los elementos
    }
    return numbers;
}
export function initialDeal(deck) {
    const deckPlayer0 = [];
    const deckPlayer1 = [];
    for (let i = 0; i < 7; i++) {
        deckPlayer0.push(deck.shift());
      }
    for (let i = 0; i < 7; i++) {
        deckPlayer1.push(deck.shift());
      }
    return [deck, deckPlayer0, deckPlayer1];
}

export function steal(deck) {
    const myDeck= deck;
    myDeck.push(deck.shift());
    return myDeck;
}
