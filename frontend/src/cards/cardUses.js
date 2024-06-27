import { discardCard , drawCard } from './CardGame';

export function executeCard1(playerState, gameState) {
    
    playerState.precision += 1;
    
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
        discardCard(2);
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

  export function executeCard3(playerState, gameState, desk) {
    
    playerState.precision += 2;
  
    discardCard(3);
    
    const selectedCardIndex = prompt("Elige una carta: 0, 1, o 2", "0");
    const selectedCard = desk[selectedCardIndex];
  
    
    playerState.hand.push(selectedCard);
  
    
    const discardedCards = desk.filter((_, index) => index !== selectedCardIndex);
    gameState.discardPile.push(...discardedCards);
  
    return { playerState, gameState };
  }

  export function executeCard4(playerState, gameState) {
    
    playerState.bullets -= 1;
    
    playerState.precision += 3;

    gameState.playerState = playerState.precision;
    
    return { playerState, gameState };
  }

  export function executeCard5(playerState, gameState) {
    
    playerState.precision += 2;
    
    if(gameState.action == 'SHOOT' ){
      playerState.bullets += 1;
    }
    
    return { playerState, gameState };
  }

  export function executeCard6(playerState, gameState) {
    
    if(playerState.precision != gameState.playerState.precision){
      playerState.precision += 3;
    }
    
    return { playerState, gameState };
  }

  export function executeCard7(playerState, gameState) {
    
    if(gameState.opponent.precision >= 4){
      playerState.precision += 4;
    }
    
    return { playerState, gameState };
  }

  export function executeCard8(playerState, gameState) {
    
    if(gameState.opponent.health > playerState.health){
      playerState.precision += 4;
    }
    
    return { playerState, gameState };
  }

  export function executeCard9(playerState, gameState) {
    
    if(gameState.opponent.action == 'SHOOT'){
      playerState.precision += 3;
    }
    
    return { playerState, gameState };
  }

  export function executeCard10(playerState, gameState) {
    
    gameState.opponent.action = null;
    
    discardCard(10);
    drawCard();

    if(gameState.opponent.action == 'SHOOT'){
      playerState.health += 1;
    }
    
    return { playerState, gameState };
  }

  export function executeCard11(playerState, gameState) {
    
    playerState.bullets -= 1;

    playerState.precision += 1;

    gameState.opponent.action = null;
    
    return { playerState, gameState };
  }

  export function executeCard12(playerState, gameState) {
    
    gameState.opponent.action = null;

    if(gameState.opponent.action != 'SHOOT'){
      discardCard(12);
      drawCard();
    }

    return { playerState, gameState };
  }

  export function executeCard13(playerState, gameState) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action == 'SHOOT'){
      playerState.bullets += 2;
    }
    
    return { playerState, gameState };
  }

  export function executeCard14(playerState, gameState) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;
    
    if(gameState.opponent.action == 'SHOOT'){
      gameState.opponent.bullets -= 2;
    }

    return { playerState, gameState };
  }

  export function executeCard15(playerState, gameState) {
    
    gameState.opponent.action = null;

    gameState.opponent.precision -= 2;

    discardCard(15);
    drawCard();
    
    return { playerState, gameState };
  }
  export function executeCard16(playerState, gameState) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action == 'SHOOT'){
      playerState.precision +=3;
    }
    
    return { playerState, gameState };
  }

  export function executeCard17(playerState, gameState) {
    
    gameState.opponent.action = null;

    discardCard(17);
    drawCard();
    
    return { playerState, gameState };
  }

  export function executeCard18(playerState, gameState) {
    
    playerState.bullets -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action === 'SHOOT'){
      playerState.bullets +=3;
    }
    
    return { playerState, gameState };
  }


