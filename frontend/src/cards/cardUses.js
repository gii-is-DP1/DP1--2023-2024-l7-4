
const limit = (value) => {
  // Limitar bullets y precision entre 0 y 6
  return Math.max(0, Math.min(value, 100));
};

const limitHealth = (health) => {
  // Limit health between 0 y 2
  return Math.max(0, Math.min(health, 100));
}


async function disparo(precision) {
  const numeroAleatorio = Math.floor(Math.random() * 7);
  if (numeroAleatorio <= precision)
    return true;
  else
    return false
}

//TODO
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


export function executeCard1(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 1),
  }));

  if (statePlayerMain.bullets >= 2) {

    setStatePlayerMain(prevState => ({
      ...prevState,
      preventDamage: true
    }));

    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets - 2),
    }));

  } else {
    setStatePlayerMain(prevState => ({
      ...prevState,
      preventDamage: false
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}
//TODO
export function executeCard2(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {
  const precisionPlayerSecondary = statePlayerSecondary.precision;

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: precisionPlayerSecondary
  }));


  //sendModal sea un json setSendModal({Tipo:"MAL DE OJO",precision:2,Discard:true,Steal:true})
  sendModal = null
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}
//TODO
export function executeCard3(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 2),
  }));

  //sendModal sea un json setSendModal({Tipo:"MÁXIMA CONCENTRACIÓN",Discard:true,See3CardsAndSteal:true})
  sendModal = null
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard4(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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


export function executeCard5(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 2),
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 1),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard6(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerMain.precision > statePlayerMain.precisionBefore) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard7(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.precision >= 4) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard8(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if (statePlayerSecondary.health > statePlayerMain.health) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 4),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard9(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayedBefore)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
    console.log(statePlayerSecondary.cardPlayedBefore)
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

//TODO
export function executeCard10(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: false,
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerMain(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health + 1),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard11(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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
export function executeCard12(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if (!((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed))) {
    // DESCARTAR CARTA;
    // ROBAR CARTA;
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard13(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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




export function executeCard14(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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
export function executeCard15(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));


  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 2),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard16(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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
export function executeCard17(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 2,
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard18(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 1,
  }));

  if ((statePlayerSecondary.cardPlayed >= 19 && statePlayerSecondary.cardPlayed <= 27) || [47, 50].includes(statePlayerSecondary.cardPlayed)) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: limit(prevState.bullets + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



// ------------------------------------------- FUNCIONES CARTAS DISPARO (COMPROBAR BALAS EN TODAS Y SI FALLA) -------------------


// TODO: VER CARTA ENTERA
export function executeCard19(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 2,
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard20(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
    precision: limit(prevState.precision - 4),
  }));

  const aciertoDisparo = disparo(statePlayerMain.precision);

  if (aciertoDisparo)
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
      bullets: limit(prevState.bullets - 2),
    }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard21(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 2),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 2),
  }));

  aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: 0,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard22(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 2),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
      precision: limit(prevState.precision - 3),
    }));
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 4),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard23(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    // EL OBJETIVO DESCARTA 2 CARTAS AL AZAR Y ROBA OTRAS 2
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
      precision: limit(prevState.precision - 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard24(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 4),
  }));

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard25(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  const menosVida = statePlayerMain.health < statePlayerSecondary.health;

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
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


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard26(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  } else {
    // DESCARTAR Y ROBAR (RIVAL)
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 3),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard27(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
  }));

  let aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  }

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 2),
  }));

  if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18)) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 2),
    }));
  }
  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}




// ------------------------------------- CARTAS DE CINTURON DE ARMAS -------------------------------------------




export function executeCard28(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
    precision: limit(prevState.precision + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// TODO
export function executeCard29(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 3),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// TODO
export function executeCard30(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));

  // PUEDE DESCARTAR 2 CARTAS PARA NO RECIBIR DAÑO (EL rival falla el tiro este turno);
  // NO SE ROBAN CARTAS

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard31(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 1),
    bullets: limit(prevState.bullets + 2),
    // precisionChange: false,
  }));



  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



// TODO
export function executeCard32(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision + 3),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard33(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 2),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}



export function executeCard34(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 2),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

// TODO
export function executeCard35(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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


export function executeCard36(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets + 1),
  }));

  // DESCARTAR CARTA;
  // ROBAR CARTA DE ENTRE 3;

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


// ----------------------------------------- CARTAS DE INTIMIDACIÓN --------------------------------------

export function executeCard37(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  // DESCARTAR CARTA;
  // ROBAR CARTA;

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



export function executeCard38(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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



export function executeCard39(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18)) {
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



export function executeCard40(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  // DESCARTAR CARTA;
  // ROBAR CARTA;

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
  }));
  if ((statePlayerSecondary.cardPlayed >= 10 && statePlayerSecondary.cardPlayed <= 18)) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      bullets: prevState.bulletsChange ? limit(prevState.bullets - 2) : prevState.bullets,
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


//TODO 
export function executeCard41(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  // CARTA TOCACOJONES
}



export function executeCard42(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


  // DESCARTAR CARTA;
  // ROBAR CARTA;

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    precision: prevState.precisionChange ? limit(prevState.precision - 1) : prevState.precision,
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard43(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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



export function executeCard44(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


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
export function executeCard45(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerSecondary(prevState => ({
    ...prevState,
    failing: 2,
  }));



  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard46(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {


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




export function executeCard47(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 1),
    precisionChange: false,
    bulletsChange: false,
  }));

  const aciertoDisparo = disparo(statePlayerMain.precision);
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));
  }


  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}


export function executeCard48(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

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


export function executeCard49(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  // DESCARTAR 3 CARTAS;
  setStatePlayerMain(prevState => ({
    ...prevState,
    health: limitHealth(prevState.health + 1),
  }));

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}

export function executeCard50(statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal) {

  setStatePlayerMain(prevState => ({
    ...prevState,
    bullets: limit(prevState.bullets - 2),
  }));

  const aciertoDisparo = disparo(statePlayerMain.precision);

  setStatePlayerMain(prevState => ({
    ...prevState,
    precision: limit(prevState.precision - 3),
  }));
  if (aciertoDisparo) {
    setStatePlayerSecondary(prevState => ({
      ...prevState,
      health: limitHealth(prevState.health - 1),
    }));

    setStatePlayerMain(prevState => ({
      ...prevState,
      precision: limit(prevState.precision + 3),
    }));
  }

  return { statePlayerMain, statePlayerSecondary, setStatePlayerMain, setStatePlayerSecondary, sendModal };
}
