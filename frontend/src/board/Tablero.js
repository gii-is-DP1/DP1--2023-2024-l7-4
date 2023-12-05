import React, { useState, useRef,  } from 'react';
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

const jwt = tokenService.getLocalAccessToken();


const App = () => {
  const id = getIdFromUrl(2);
  const username = jwtDecode(jwt).sub;
  const [round, setRound] = useState(0);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [match, setMatch] = useFetchState(
    [],
    `/api/v1/matches/${id}`,
    jwt,
    setMessage,
    setVisible,
    id);
    const matchPlayerList =  Array.apply(",", match.joinedPlayers);

  
    
  const initialListSize = 6;
  const [state, setState] = useState({
    numbers: Array.from({ length: initialListSize }, () => Math.floor(Math.random() * 6) + 1),
    isListVisible: true,
    isListLocationVisible: false,
    locationSelect: null,
    numberDice: null,
    locationCounters: {},
    availableLocations: ["Montaña", "Castillo", "Campo", "Bosque", "Río", "Pueblo"],
  });

  const gameLayoutRef = useRef();


  // HANDLES NUMBER
  const handleNumberClick = (clickedNumber) => {
    const newListSize = state.numbers.length - 1;
    const newRandomNumbers = Array.from({ length: newListSize }, () => Math.floor(Math.random() * 6) + 1);
    setState({
      ...state,
      numbers: newRandomNumbers,
      isListVisible: false,
      isListLocationVisible: true,
      numberDice: clickedNumber
    });
  };

  const handleShowListClick = () => {
    const randomNumbers = Array.from({ length: state.numbers.length }, () => Math.floor(Math.random() * 6) + 1);
    gameLayoutRef.current.resetBuiltHexagons();
    setState({
      ...state,
      numbers: randomNumbers,
      isListVisible: true,
    });
  };

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

    if (locationCounters[selectedLocation] >= 3) {
      const updatedLocations = availableLocations.filter((location) => location !== selectedLocation);
      setState({
        ...state,
        availableLocations: updatedLocations,
      });
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

      {matchPlayerList[round%match.maxPlayers] === username && state.isListVisible && (
        <NumberList numbers={state.numbers} onNumberClick={handleNumberClick} />
      )}

      {state.isListLocationVisible && <LocationList availableLocations={state.availableLocations} onSelect={handleLocationSelect} />}
    </div>
  );
};

export default App;
