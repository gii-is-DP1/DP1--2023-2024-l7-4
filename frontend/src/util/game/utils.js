export function generateUniqueRandomNumbers(count = 50, min = 1, max = 50) {
    if (count > (max - min + 1)) {
        throw new Error("Count exceeds the range of unique numbers available.");
    }

    const numbers = [];
    while (numbers.length < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}

export function initialDeal(deck) {
    const newDeck = [];
    for (let i = 0; i < 7; i++) {
        newDeck.push(deck.shift());
      }
    
    return newDeck;
}

export function steal(deck) {
    const myDeck= deck;
    myDeck.push(deck.shift());
    return myDeck
}
