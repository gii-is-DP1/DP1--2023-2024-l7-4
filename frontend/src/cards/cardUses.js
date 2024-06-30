
const limit = (value) => {
  // Limitar bullets y precision entre 0 y 6
  return Math.max(0, Math.min(value, 6));
};

const limitHealth = (health) => {
  // Limit health between 0 y 2
  return Math.max(0, Math.min(health, 6));
}


async function disparo(precision) {
  const numeroAleatorio = Math.floor(Math.random() * 7);
  if (numeroAleatorio <= precision)
    return true;
  else
    return false;
}

//TODO
export function executeCard51(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const numeroAleatorio = Math.random();

  if (numeroAleatorio < 0.5) {
    const random = Math.random();
    if (random < 0.5) {
      setStatePlayerMain(prevState => ({
        ...prevState,
        precision: limit(prevState.precision + 2),
      }));
    } else {
      setStatePlayerMain(prevState => ({
        ...prevState,
        bullets: limit(prevState.bullets + 1),
      }));
    }
  } else {
    const RandomCardIndex = Math.floor(Math.random() * statePlayerMain.cards.length);

    const updatedCards = [
      ...statePlayerMain.cards.slice(0, RandomCardIndex),
      ...statePlayerMain.cards.slice(RandomCardIndex + 1),
    ];
    
    const newCard = deckOfCards.pop();
    setDeckOfCards(deckOfCards);
  
    setStatePlayerMain(prevState => ({
      ...prevState,
      cards: [...updatedCards, newCard],
    }));
  }

 

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// -------------------------------------------------- CARTAS DE PUNTERIA ----------------------------------------------------

export function executeCard1(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 1),
  }));

  if (statePlayerMain.bullets >= 2) {

    setStatePlayerMain(prevState => ({
      ...prevState,
      preventDamage: true,
      bullets: limit(prevState.bullets - 2),
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard2(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const precisionPlayerSecondary = statePlayerSecondary.precision;

  const prob = Math.random();

  if (prob < 0.5) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 2),
    }));
  } else {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: precisionPlayerSecondary,
    }));

    const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

    const newCard = deckOfCards.pop();
    setDeckOfCards(deckOfCards);

    setStatePlayerMain(prevState => ({
      ...prevState,
      cards: [...updatedCards, newCard],
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard3(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 2),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: updatedCards,
  }));

  sendModal('CHOOSE', 3);

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard4(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 3),
  }));

  setStatePlayerMain(prevState => ({
    ...prevState,
    precisionChange: false
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard5(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 2),
  }));

  if ((statePlayerSecondary.cardPlayedBefore >= 19 && statePlayerSecondary.cardPlayedBefore <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayedBefore)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 1),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard6(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerMain.precision > statePlayerMain.precisionBefore) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard7(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.precision >= 4) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard8(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.health > statePlayerMain.health) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard9(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayedBefore)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
    console.log(statePlayerSecondary.cardPlayedBefore)
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard10(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health + 1),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard11(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 1),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//TODO
export function executeCard12(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if (!((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed))) {

    const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

    const newCard = deckOfCards.pop();
    setDeckOfCards(deckOfCards);

    setStatePlayerMain(prevState => ({
      ...prevState,
      cards: [...updatedCards, newCard],
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard13(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 2),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}




export function executeCard14(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
  }));
  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 2),
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//TODO
export function executeCard15(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));


  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 2),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard16(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//TODO
export function executeCard17(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 2,
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard18(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



// ------------------------------------------- FUNCIONES CARTAS DISPARO (COMPROBAR BALAS EN TODAS Y SI FALLA) -------------------



export function executeCard19(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const aciertoDisparo = disparo(statePlayerMain.precision);

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 5),
  }));

  if (aciertoDisparo && statePlayerMain.failing === 0)
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
    }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard20(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));


    const aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 4),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0)
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
        bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
      }));

  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard21(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 2) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 2),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 2),
    }));

    aciertoDisparo = disparo(statePlayerMain.precision);
    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: 0,
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard22(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 4),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
        precision: limit(prevState.precision - 3),
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard23(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.precisionChange ? limit(prevState.precision - 3) : prevState.precision,
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      // EL OBJETIVO DESCARTA 2 CARTAS AL AZAR Y ROBA OTRAS 2
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard24(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 3),
    }));

    setStatePlayerSecondary(prevState => ({
      ...prevState,
      precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
    }));
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard25(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const menosVida = statePlayerMain.health < statePlayerSecondary.health;

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);
    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 3),
    }));

    if (menosVida) {
      setStatePlayerMain(prevState => ({
        ...prevState,
        bullets: limit(prevState.bullets + 2),
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard26(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    } else {
      sendModal('CHOOSE', 1);
    }


  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard27(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision - 2),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
      }));
    }

    if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18) || statePlayerSecondary.cardPlayed === 48) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        precision: prevState.precisionChange ? limit(prevState.precision + 2) : prevState.precision,
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}




// ------------------------------------- CARTAS DE CINTURON DE ARMAS -------------------------------------------




export function executeCard28(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
    precision: limit(prevState.precision + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard29(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 3) : prevState.precision,
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// TODO
export function executeCard30(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));

  // PUEDE DESCARTAR 2 CARTAS PARA NO RECIBIR DAÑO (EL rival falla el tiro este turno);
  // NO SE ROBAN CARTAS

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard31(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
    bullets: limit(prevState.bullets + 2),
    // precisionChange: false,
  }));



  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard32(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 3),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard33(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard34(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 2),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard35(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerMain.bullets === 0) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 2),
    }));

    // DESCARTAR CARTA;
    // ROBAR CARTA;
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard36(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);
  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [updatedCards],
  }));

  sendModal('CHOOSE', 3);


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// ----------------------------------------- CARTAS DE INTIMIDACIÓN --------------------------------------

export function executeCard37(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  setStatePlayerMain(prevState => ({
    ...prevState,
    recievex2damage: true,
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 4) : prevState.precision,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard38(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
    bulletsChange: false,
    precisionChange: false,
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 3) : prevState.precision,
  }));


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard39(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18) || statePlayerSecondary.cardPlayed === 48) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 1),
    }));
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: prevState.bulletsChange ? limit(prevState.bullets - 1) : prevState.bullets,
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard40(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
  }));
  if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18) || statePlayerSecondary.cardPlayed === 48) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//TODO 
export function executeCard41(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  // CARTA TOCACOJONES
}



export function executeCard42(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));


  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard43(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if ((statePlayerMain.cardPlayedBefore >= 10 && statePlayerMain.cardPlayedBefore <= 18)) {
    if (statePlayerSecondary.precision >= 4) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        precision: prevState.precisionChange ? limit(prevState.precision - 2) : prevState.precision,
      }));
    }
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard44(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
    bulletsChange: false,
    precisionChange: false,
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 3) : prevState.precision,
  }));

  if (statePlayerSecondary.health > statePlayerMain.health) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 2),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// INTIMIDACION TODO
export function executeCard45(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 2,
  }));



  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard46(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  if (statePlayerMain.cardPlayedBefore === 46) {
    // DESCARTAR CARTA;
    // ROBAR CARTA;

    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: prevState.bulletsChange ? limit(prevState.bullets - 3) : prevState.bullets,
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}




export function executeCard47(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
    precisionChange: false,
    bulletsChange: false,
  }));

  const aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo && statePlayerMain.failing === 0) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard48(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
    preventDamage: true,
  }));

  const probabilidadDescarte = Math.random();
  if (probabilidadDescarte > 0.5) {
    //DESCARTAR CARTA FINTA
    //ROBAR CARTA
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 2),
      preventDamage: true,
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard49(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  // DESCARTAR 3 CARTAS;
  setStatePlayerMain(prevState => ({
    ...prevState,
    health: limitHealth(prevState.health + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard50(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 2),
  }));

  const aciertoDisparo = disparo(statePlayerMain.precision);

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 3),
  }));
  if (aciertoDisparo && statePlayerMain.failing === 0) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: !prevState.preventDamage ? limitHealth(prevState.health - 1) : prevState.health,
    }));

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}
