import React, { useState, useRef, useEffect,  } from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import TilesLayout from './TilesLayout';
import './App.css';
import NumberList from './NumberList';
import LocationList from './LocationList';
import useFetchState from '../util/useFetchState';
import useFetchStatePlayers from '../util/useFetchStatePlayers';
import getIdFromUrl from '../util/getIdFromUrl';
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import useFetchStateRounds from '../util/useFetchStateRounds';

const jwt = tokenService.getLocalAccessToken();


const App = () => {

  const id = getIdFromUrl(2);
  const username = jwtDecode(jwt).sub;
  const initialListSize = 6;
  const gameLayoutRef = useRef();
  const emptyRound = {
    match: null,
    subRound: 0,
    mainPlayer: '',
    dices: [],
    territory:'',
  }

  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [obtained, setObtained] = useState(false);
  const [round, setRound] = useState(0);
  const [match, setMatch] = useFetchState(
    [],
    `/api/v1/matches/${id}`,
    jwt,
    setMessage,
    setVisible,
    id);

  const matchPlayerList =  Array.apply(",", match.joinedPlayers);    
  let mainPlayer = matchPlayerList[(round+match.maxPlayers+1)%match.maxPlayers] === username;

  const [state, setState] = useState({
    numbers: Array.from({ length: initialListSize }, () => Math.floor(Math.random() * 6) + 1),
    isListVisible: true,
    isListLocationVisible: false,
    locationSelect: null,
    numberDice: null,
    locationCounters: {},
    availableLocations: ["Montaña", "Castillo", "Campo", "Bosque", "Río", "Pueblo"],
  });
  const [totalRound, setTotalRound] = useFetchStateRounds(
    [],
    `/api/v1/rounds/${id}/${round}`,
    jwt,
    setMessage,
    setVisible,
    obtained
    )

    useEffect(()=> {
      if(round === 0 && mainPlayer){
          setObtained(true);
      }
      else if(round === totalRound.subRound){
        setObtained(true);
      }else {
        setObtained(false);
      }
    }
    , [round, mainPlayer, obtained, totalRound]);


  // HANDLE ELEGIR DADO
  const handleNumberClick = (clickedNumber) => {
    const newListSize = state.numbers.length - 1;
    const newRandomNumbers = Array.from({ length: newListSize }, () => Math.floor(Math.random() * 6) + 1);
    //Si es el jugador principal entonces se mostrará la lista para elegir territorios
    if(mainPlayer){
    setState({
      ...state,
      numbers: newRandomNumbers,
      isListVisible: false,
      isListLocationVisible: true,
      numberDice: clickedNumber
    });
  }else {
        //Si no es el jugador principal entonces directamente se asignará el LocationSelect(Territorio elegido) al recibido de la base de datos
    setState({
      ...state,
      numbers: newRandomNumbers,
      isListVisible: false,
      isListLocationVisible: false,
      locationSelect: totalRound.territory,
      numberDice: clickedNumber
    });
  }
};

  // HANDLE MOSTRAR LISTA DE DADOS
  const handleShowListClick = () => {
    gameLayoutRef.current.resetBuiltHexagons();
    setRound(parseInt(round)+1)
    //Si el jugador principal es al que le toca elegir los dados se muestran los randoms
    if(mainPlayer){
      const listSize = state.numbers.length;
      const randomNumbers = Array.from({ length: listSize }, () => Math.floor(Math.random() * 6) + 1);
      setState({
        ...state,
        numbers: randomNumbers,
        isListVisible: true,
      });
      }//Si no es el jugador principal al que le toca elegir los dados recibe tanto los dados como el territorio del totalRound
      else {
        const listDices = Array.from(totalRound.dices);
        setState({
          ...state,
          numbers: listDices,
          isListVisible: true
        });
    }
}

// FUNCIÓN PARA UPDATEAR EL TAMAÑO DE LA LISTA DE LOS DADOS
  const updateNumberDice = () => {
    const currentNumberDice = state.numberDice;
    if (currentNumberDice > 0) {
      setState({
        ...state,
        numberDice: currentNumberDice - 1,
      });
    }
  };


  const handleLocationSelect = (selectedLocation) => {
    const { locationCounters, availableLocations } = state;
    setState(prevState => ({
      ...prevState,
      isListLocationVisible: false,
      locationSelect: selectedLocation,
      locationCounters: {
        ...prevState.locationCounters,
        [selectedLocation]: (prevState.locationCounters[selectedLocation] || 0) + 1
      }
    }));

    // SI EL JUGADOR ACTUAL ES EL ACTIVO
    if(mainPlayer){
      emptyRound.match = match;
      emptyRound.subRound = round;
      emptyRound.mainPlayer = username;
      emptyRound.dices = state.numbers;
      emptyRound.territory = selectedLocation;
      fetch('/api/v1/rounds', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(emptyRound),
    });

  if (locationCounters[selectedLocation] >= 3) {
    const updatedLocations = availableLocations.filter((location) => location !== selectedLocation);
    setState({
      ...state,
      availableLocations: updatedLocations,
    });
    }
  }
  };



  const rotationStyle = {
    transform: 'rotate(30deg)',
  };

  return (
    <div className="app">
      <HexGrid width={1000} height={900} viewBox="-80 -50 100 100" style={rotationStyle}>
        <GameLayout ref={gameLayoutRef} />
      </HexGrid>
      <HexGrid width={500} height={1000} viewBox="-30 -0 100 100" >
        <TilesLayout locationCounters={state.locationCounters} updateNumberDice={updateNumberDice} numberDice={state.numberDice} locationSelect={state.locationSelect} />
      </HexGrid>
    
      {!state.isListVisible && !state.isListLocationVisible && (
        <button className="show-list-button" onClick={handleShowListClick}>
          Next round
        </button>
      )}
      <h>Round: {round}</h>
      <div>
        <h1>{matchPlayerList}</h1>
      </div>

      {mainPlayer && state.isListVisible && (
        <NumberList numbers={state.numbers} onNumberClick={handleNumberClick} />
      )}

      {mainPlayer && state.isListVisible && (
        <NumberList numbers={state.numbers} onNumberClick={handleNumberClick} />
      )}

      {state.isListLocationVisible && <LocationList availableLocations={state.availableLocations} onSelect={handleLocationSelect} />}
    </div>
  );
};

export default App;
