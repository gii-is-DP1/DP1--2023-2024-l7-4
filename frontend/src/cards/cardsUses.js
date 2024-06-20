export function executeCard1(playerState, gameState) {
    
    playerState.accuracy += 1;
    
    if(playerState.bullets >= 2) {
        playerState.preventDamage = true;
        playerState.bullets -= 2;
    } else {
        playerState.preventDamage = false;
    }
    
    return { playerState, gameState };
  }

  export function executeCard2(playerState, gameState, action, drawCard) {
    switch(action) {
      case 'GAIN_PRECISION':
        playerState.precision += 2;
        break;
      case 'DISCARD_AND_DRAW':
        playerState.hand = playerState.hand.filter(card => card.id !== 2); 
        drawCard();
        break;
      case 'EQUALIZE_PRECISION':
        playerState.precision = gameState.opponent.precision;
        break;
      default:
        console.error('Acción desconocida');
    }
  
    return { playerState, gameState };
  }

  export function executeCard3(playerState, gameState, drawCards) {
    
    playerState.precision += 2;
  
    
    const drawnCards = drawCards(3);
  
    
    const selectedCardIndex = prompt("Elige una carta: 0, 1, o 2", "0");
    const selectedCard = drawnCards[selectedCardIndex];
  
    
    playerState.hand.push(selectedCard);
  
    
    const discardedCards = drawnCards.filter((_, index) => index !== selectedCardIndex);
    gameState.discardPile.push(...discardedCards);
  
    return { playerState, gameState };
  }

  export function executeCard4(playerState, gameState) {
    
    playerState.accuracy += 1;
    
    if(playerState.bullets >= 2) {
        playerState.preventDamage = true;
        playerState.bullets -= 2;
    } else {
        playerState.preventDamage = false;
    }
    
    return { playerState, gameState };
  }

  export function executeCard5(playerState, gameState) {
    
    playerState.accuracy += 1;
    
    if(playerState.bullets >= 2) {
        playerState.preventDamage = true;
        playerState.bullets -= 2;
    } else {
        playerState.preventDamage = false;
    }
    
    return { playerState, gameState };
  }