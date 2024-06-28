
const limit = (value) => {
  // Limitar bullets entre 0 y 6
  return Math.max(0, Math.min(value, 6));
};



export function executeCard1(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  statePlayerMain.precision += 1;

  if (statePlayerMain.bullets >= 2) {

    statePlayerMain.preventDamage = true;
    statePlayerMain.bullets -= 2;

  } else {
    statePlayerMain.preventDamage = false;
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard51(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const numeroAleatorio = Math.random();
  if (numeroAleatorio < 0.5) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 2),
    }));
  }
  else {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 1),
    }));
  }
  sendModal = 'MiradaFijaDescarte'

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


/*
  export function executeCard2(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal, action, drawCard) {
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
  
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard3(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal, desk) {
    
    playerState.precision += 2;
  
    discardCard(3);
    
    const selectedCardIndex = prompt("Elige una carta: 0, 1, o 2", "0");
    const selectedCard = desk[selectedCardIndex];
  
    
    playerState.hand.push(selectedCard);
  
    
    const discardedCards = desk.filter((_, index) => index !== selectedCardIndex);
    gameState.discardPile.push(...discardedCards);
  
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard4(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.bullets -= 1;
    
    playerState.precision += 3;

    gameState.playerState = playerState.precision;
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard5(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.precision += 2;
    
    if(gameState.action == 'SHOOT' ){
      playerState.bullets += 1;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard6(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    if(playerState.precision != gameState.playerState.precision){
      playerState.precision += 3;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard7(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    if(gameState.opponent.precision >= 4){
      playerState.precision += 4;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard8(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    if(gameState.opponent.health > playerState.health){
      playerState.precision += 4;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard9(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    if(gameState.opponent.action == 'SHOOT'){
      playerState.precision += 3;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard10(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    gameState.opponent.action = null;
    
    discardCard(10);
    drawCard();

    if(gameState.opponent.action == 'SHOOT'){
      playerState.health += 1;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard11(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.bullets -= 1;

    playerState.precision += 1;

    gameState.opponent.action = null;
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard12(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    gameState.opponent.action = null;

    if(gameState.opponent.action != 'SHOOT'){
      discardCard(12);
      drawCard();
    }

    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard13(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action == 'SHOOT'){
      playerState.bullets += 2;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard14(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;
    
    if(gameState.opponent.action == 'SHOOT'){
      gameState.opponent.bullets -= 2;
    }

    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard15(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    gameState.opponent.action = null;

    gameState.opponent.precision -= 2;

    discardCard(15);
    drawCard();
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }
  export function executeCard16(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.precision -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action == 'SHOOT'){
      playerState.precision +=3;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard17(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    gameState.opponent.action = null;

    discardCard(17);
    drawCard();
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }

  export function executeCard18(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
    
    playerState.bullets -= 1;

    gameState.opponent.action = null;

    if(gameState.opponent.action === 'SHOOT'){
      playerState.bullets +=3;
    }
    
    return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
  }


*/