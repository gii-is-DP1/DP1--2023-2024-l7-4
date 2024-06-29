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

    if(gameState.opponent.action == 'SHOOT'){
      playerState.bullets +=3;
    }
    
    return { playerState, gameState };
  }

  /** Cigarrillo */
  export function executeCard27(playerState, gameState){
    playerState.bullets += 1;
    playerState.precision += 1;
    return { playerState, gameState };
  }

  /** Olor Extraño */
  export function executeCard28(playerState, gameState){
    gameState.opponent.precision -= 3;
    discardCard(28)
    drawCard()
    return { playerState, gameState };
  }

  /** A Cubierto */
  export function executeCard29(playerState, gameState){
    playerState.bullets += 1;
    const preventDamage = confirm("¿Quieres descartar 2 cartas para prevenir el daño este turno?");
    if (preventDamage) {
        if (playerState.hand.length >= 2) {
            discardCard(29);
            playerState.preventDamage = true;
        } else {
            alert("No tienes suficientes cartas para descartar.");
            playerState.preventDamage = false;
        }
    } else {
        playerState.preventDamage = false;
    }
    
    return { playerState, gameState };
  }
  /** Pasame el Whiskey */
  export function executeCard30(playerState, gameState){
    playerState.precision -= 1;
    playerState.canGainPrecisionNextTurn = false;
    gameState.bullets += 2;
    return{playerState, gameState}
  }

  /** Pata de Conejo */
  export function executeCard31(playerState, gameState){
    gameState.precision += 3;
    discardCard(31)
    drawCard()
    return{playerState, gameState}
  }

  /** Sabotaje */ 
  export function executeCard32(playerState, gameState){
    playerState.opponent.bullets -= 2;
    discardCard(32)
    drawCard()
    return{playerState, gameState}
  }

  /** Carga Rapida */
  export function executeCard33(playerState, gameState){
    playerState.bullets += 2;
    discardCard(33)
    drawCard()
    return{playerState, gameState}
  }

  /** Preparación */
  export function executeCard34(playerState, gameState){
    if(playerState.bullets = 0){
      playerState.bullets += 3;
      discardCard(34);
      drawCard()
    }
    return{playerState, gameState}
  }

  /** Farol */
  export function executeCard35(playerState, gameState, deck){
    playerState.bullets += 1;

    discardCard(35);

    if (deck.length > 0) {

        const cardsToDraw = Math.min(3, deck.length);
        const drawnCards = deck.splice(0, cardsToDraw);

        const selectedCardIndex = prompt(`Elige una carta (0 a ${cardsToDraw - 1}):`, "0");
        const selectedCard = drawnCards.splice(selectedCardIndex, 1)[0];
        
        playerState.hand.push(selectedCard);
        
        gameState.discardPile.push(...drawnCards);
    } else {
        console.warn("No hay suficientes cartas en el mazo.");
    }
    
    return { playerState, gameState, deck };
}

    /** Dinamita */
    export function executeCard36(playerState, gameState){
      discardCard(36)
      drawCard()

      //Recibir doble de daño
      playerState.receiveDoubleDamage = true;
      gameState.opponent.precision -= 4;
      return{playerState, gameState}
    }

    /** Irascible */
    export function executeCard37(playerState, gameState){
        if (playerState.bullets > 0) {
            playerState.bullets -= 1;
        } else {
            console.warn("No tienes suficientes balas para gastar.");
            return { playerState, gameState };  
        }
        gameState.opponent.precision -= 3;
        if (gameState.opponent.precision < 0) {
            gameState.opponent.precision = 0;  
        }

        playerState.preventPrecisionLoss = true;
        playerState.preventBulletLoss = true;
    
        return { playerState, gameState };
    }

    /** Someter */
    export function executeCard38(playerState, gameState) {
      if (gameState.opponent.previousAction === 'Finta') {
          playerState.bullets += 1;
          
          if (gameState.opponent.bullets > 0) {
              gameState.opponent.bullets -= 1;
          } else {
              console.warn("El objetivo no tiene balas para perder.");
          }
      } else {
          console.warn("El objetivo no usó 'Finta' en el turno anterior.");
      }
      
      return { playerState, gameState };
  }

  /** Amago */
  export function executeCard39(playerState, gameState){
    discardCard(39);  
    drawCard();     

    gameState.opponent.precision -= 1;
    if (gameState.opponent.precision < 0) {
        gameState.opponent.precision = 0;  
    }
    // Verificar si un rival usó una acción de "Finta" este turno
    if (gameState.opponent.currentAction === 'Finta') {
        if (gameState.opponent.bullets >= 2) {
            gameState.opponent.bullets -= 2;
        } else {
            gameState.opponent.bullets = 0;  // Asegurarse de que las balas no sean negativas
            console.warn("El objetivo no tiene suficientes balas para perder.");
        }
    }
    return{playerState, gameState}
}

  /** Insidioso */
  export function executeCard40(playerState, gameState){
    discardCard(40);
    drawCard();

    playerState.canPlayTwoCardsNextTurn = true;
    return { playerState, gameState };
  }

  /** Mirada demencial */
  export function executeCard41(playerState, gameState){
    discardCard(41);
    drawCard();

    if (gameState.opponent.bullets > 0) {
      gameState.opponent.bullets -= 1;
    } else {
        console.warn("El objetivo no tiene balas para perder.");
    }

     return { playerState, gameState };
  }

  /** Juegos Mentales */
  export function executeCard42(playerState, gameState){
    if(playerState.previousAction === 'Finta'){
      if (gameState.opponent.precision >= 4) {
          gameState.opponent.precision -= 4;
        if (gameState.opponent.precision < 0) {
            gameState.opponent.precision = 0;
        }
        } else {
          console.warn("La precisión del oponente no es igual o mayor que 4.");
        }
        } else {
          onsole.warn("No jugaste una acción de 'Finta' en tu turno anterior.");
        }
    }

  /** Sed de Venganza */
  export function executeCard43(playerState, gameState) {
    if (playerState.bullets > 0) {
        playerState.bullets -= 1;
        gameState.opponent.precision -= 3;
        if (gameState.opponent.precision < 0) {
            gameState.opponent.precision = 0;
        }

        if (playerState.health < gameState.opponent.health) {
            playerState.precision += 2;
        }
    } else {
        console.warn("No tienes suficientes balas para realizar esta acción.");
    }

    return { playerState, gameState };
}

  /** Sonrisa Macabra */
  export function executeCard44(playerState, gameState){
    const cardInHand = playerState.hand.includes(executeCard44)
    if (cardInHand && gameState.opponent.action === 'Disparo') {
      gameState.opponent.precision -= 1;
      if (gameState.opponent.precision < 0) {
          gameState.opponent.precision = 0;
      }
  }
  return{playerState, gameState}
  }

  /** Cinturón de armas */
 
  /** Disparo decisivo */
  export function executeCard46(playerState, gameState){
      if(playerState.bullets > 0 ){
      }
    return{playerState, gameState}
  }


  
  
  
     
    



  



