
const limit = (value) => {
  // Limitar bullets y precision entre 0 y 6
  return Math.max(0, Math.min(value, 6));
};

const limitHealth = (health) => {
  // Limit health between 0 y 2
  return Math.max(0, Math.min(health, 2));
}


async function disparo(precision) {
  const numeroAleatorio = Math.floor(Math.random() * 7);
  if (numeroAleatorio <= precision)
    return true;
  else
    return false;
}

//DONE
export function executeCard51(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const numeroAleatorio = Math.random();

  if (numeroAleatorio < 0.5) {
    const random = Math.random();
    if (random < 0.5) {
      setStatePlayerMain(prevState => ({
        ...prevState,
        precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 2),
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

//DONE
export function executeCard1(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 1),
  }));

  const random = Math.random();

  if (random < 0.5) {
    if (statePlayerMain.bullets >= 2) {

      setStatePlayerMain(prevState => ({
        ...prevState,
        preventDamage: true,
        bullets: limit(prevState.bullets - 2),
      }));
    }
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard2(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const precisionPlayerSecondary = statePlayerSecondary.precision;

  const prob = Math.random();

  if (prob < 0.5) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 2),
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

//DONE
export function executeCard3(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 2),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards],
  }));

  sendModal('CHOOSE', 3, statePlayerMain.playerNumber);

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard4(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
      precisionChange: false

    }));

  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard5(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 2),
  }));

  if ((statePlayerSecondary.cardPlayedBefore >= 19 && statePlayerSecondary.cardPlayedBefore <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayedBefore)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 1),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard6(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerMain.precision > statePlayerMain.precisionBefore) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard7(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.precision >= 4) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard8(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.health > statePlayerMain.health) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard9(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayedBefore)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
    }));

  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard10(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health + 1),
    }));
  }

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));




  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard11(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
      precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 1),
    }));

    setStatePlayerSecondary(prevState => ({
      ...prevState,
      failing: 1,
    }));
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
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


//DONE
export function executeCard13(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const prevPrecision = statePlayerMain.precision;

  if (prevPrecision >= 1) {
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
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard14(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const prevPrecision = statePlayerMain.precision;

  if (prevPrecision >= 1) {
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
        bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
      }));
    }
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard15(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
    precision: prevState.precisionChange ? limit(prevState.precision - 2) : prevState.precision,
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


//DONE
export function executeCard16(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevPrecision = statePlayerMain.precision;

  if (prevPrecision >= 1) {

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
        precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
      }));
    }
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
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


//DONE
export function executeCard18(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 1) {
    setStatePlayerMain(prevState => ({
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
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



// ------------------------------------------- FUNCIONES CARTAS DISPARO ----------------------------------------


//DONE
export function executeCard19(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const aciertoDisparo = disparo(statePlayerMain.precision);

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 6) : limit(prevState.precision - 5),
  }));

  if (aciertoDisparo && statePlayerMain.failing === 0)
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
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


//DONE
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 5) : limit(prevState.precision - 4),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0)
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
        bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
      }));

  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
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
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    }


    aciertoDisparo = disparo(statePlayerMain.precision);

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    }

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: 0,
    }));

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 5) : limit(prevState.precision - 4),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
        precision: prevState.precisionChange ? limit(prevState.precision - 3) : prevState.precision,
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {

      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));

      const indicesAleatorios = [];
      while (indicesAleatorios.length < 2) {
        const indiceAleatorio = Math.floor(Math.random() * statePlayerSecondary.cards.length);
        if (!indicesAleatorios.includes(indiceAleatorio)) {
          indicesAleatorios.push(indiceAleatorio);
        }
      }

      const updatedCards = statePlayerSecondary.cards.filter((_, index) => !indicesAleatorios.includes(index));

      const newCard1 = deckOfCards.pop();
      const newCard2 = deckOfCards.pop();

      setDeckOfCards([...deckOfCards]);

      setStatePlayerSecondary(prevState => ({
        ...prevState,
        cards: [...updatedCards, newCard1, newCard2],
      }));
    }
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    }

    setStatePlayerSecondary(prevState => ({
      ...prevState,
      precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
    }));
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard25(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const menosVida = statePlayerMain.health < statePlayerSecondary.health;

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets > 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
    }));

    let aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    }

    if (menosVida) {
      setStatePlayerMain(prevState => ({
        ...prevState,
        bullets: limit(prevState.bullets + 2),
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    } else {

      const updatedCards = statePlayerSecondary.cards.filter((card) => card !== statePlayerMain.cardPlayed);

      if (updatedCards.length !== statePlayerSecondary.cards.length) {

        const newCard = deckOfCards.pop();
        setDeckOfCards(deckOfCards);

        setStatePlayerSecondary(prevState => ({
          ...prevState,
          cards: [...updatedCards, newCard],
        }));
      }

    }
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
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
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 3) : limit(prevState.precision - 2),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
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



//DONE
export function executeCard28(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
    precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
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


//DONE
export function executeCard30(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));
  const random = Math.random();

  if (random < 0.5) {


    const indicesAleatorios = [setStatePlayerMain.cardPlayed];
    while (indicesAleatorios.length < 2) {
      const indiceAleatorio = Math.floor(Math.random() * statePlayerMain.cards.length);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    const cartasActualizadas = statePlayerMain.cards.filter((_, index) => !indicesAleatorios.includes(index));

    setStatePlayerMain(prevState => ({
      ...prevState,
      cards: cartasActualizadas,
      health: limitHealth(prevState.health + 1),
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard31(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
    bullets: limit(prevState.bullets + 2),
    winPrecision: 2,
  }));



  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard32(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
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

//DONE
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


//DONE
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

//DONE
export function executeCard35(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerMain.bullets === 0) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 3),
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

//DONE
export function executeCard36(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards],
  }));

  sendModal('CHOOSE', 3, statePlayerMain.playerNumber);


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// ----------------------------------------- CARTAS DE INTIMIDACIÓN --------------------------------------

//DONE
export function executeCard37(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
    recievex2damage: true,

  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 4) : prevState.precision,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard38(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 1) {

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

  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard39(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  if ((statePlayerSecondary.cardPlayedBefore >= 10 && statePlayerSecondary.cardPlayedBefore <= 18) || statePlayerSecondary.cardPlayedBefore === 48) {
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


//DONE
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

  const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

  const newCard = deckOfCards.pop();
  setDeckOfCards(deckOfCards);

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: [...updatedCards, newCard],
  }));

  setStatePlayerMain(prevState => ({
    ...prevState,
    insidious: true,
  }))

}


//TODO (EN CUALQUIER MOMENTO CON ALGUN USEEFFECT)
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
    bullets: prevState.bulletsChange ? limit(prevState.bullets - 1) : prevState.bullets,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard43(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if ((statePlayerMain.cardPlayedBefore >= 10 && statePlayerMain.cardPlayedBefore <= 18) || statePlayerMain.cardPlayedBefore === 48) {
    if (statePlayerSecondary.precision >= 4) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        precision: prevState.precisionChange ? limit(prevState.precision - 4) : prevState.precision,
      }));
    }
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard44(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;
  if (prevBullets >= 1) {
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
        precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 2),
      }));
    }
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard45(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard46(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  if (statePlayerMain.cardPlayedBefore === 46) {

    const updatedCards = statePlayerMain.cards.filter((card) => card !== statePlayerMain.cardPlayed);

    const newCard = deckOfCards.pop();
    setDeckOfCards(deckOfCards);

    setStatePlayerMain(prevState => ({
      ...prevState,
      cards: [...updatedCards, newCard],
    }));

    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: prevState.bulletsChange ? limit(prevState.bullets - 4) : prevState.bullets,
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



//DONE
export function executeCard47(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 1) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 1),
      precisionChange: false,
      bulletsChange: false,
    }));

    const aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    }
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard48(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
    preventDamage: true,
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,

  }));
  const probabilidadDescarte = Math.random();

  if (probabilidadDescarte > 0.5) {
    const cardToDiscardIndex = statePlayerMain.cards.findIndex(card => (card >= 10 && card <= 18) || card === 48);

    if (cardToDiscardIndex !== -1) {
      const updatedCards = statePlayerMain.cards.filter((_, index) => index !== cardToDiscardIndex);

      const newCard = deckOfCards.pop();
      setDeckOfCards(deckOfCards);

      setStatePlayerMain(prevState => ({
        ...prevState,
        cards: [...updatedCards, newCard],
        bullets: limit(prevState.bullets + 2),
      }));
    }
  };


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//DONE
export function executeCard49(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  const indicesAleatorios = [setStatePlayerMain.cardPlayed];
  while (indicesAleatorios.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * statePlayerMain.cards.length);
    if (!indicesAleatorios.includes(indiceAleatorio)) {
      indicesAleatorios.push(indiceAleatorio);
    }
  }

  const cartasActualizadas = statePlayerMain.cards.filter((_, index) => !indicesAleatorios.includes(index));

  setStatePlayerMain(prevState => ({
    ...prevState,
    cards: cartasActualizadas,
    health: limitHealth(prevState.health + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//DONE
export function executeCard50(deckOfCards, setDeckOfCards, statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const prevBullets = statePlayerMain.bullets;

  if (prevBullets >= 2) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 2),
    }));

    const aciertoDisparo = disparo(statePlayerMain.precision);

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: statePlayerSecondary.intimidationCardInHand ? limit(prevState.precision - 4) : limit(prevState.precision - 3),
    }));

    if (aciertoDisparo && statePlayerMain.failing === 0) {
      setStatePlayerSecondary(prevState => ({
        ...prevState,
        health: !prevState.preventDamage ? (prevState.recievex2damage ? limitHealth(prevState.health - 2) : limitHealth(prevState.health - 1)) : prevState.health,
      }));
    } else {
      setStatePlayerMain(prevState => ({
        ...prevState,
        precision: prevState.winPrecision === 1 ? prevState.precision : limit(prevState.precision + 3),
      }));
    }

  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}
