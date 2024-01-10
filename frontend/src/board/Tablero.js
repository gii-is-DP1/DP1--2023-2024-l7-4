import React, { useState, useRef, useEffect, useCallback,  } from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import TilesLayout from './TilesLayout';
import './App.css';
import NumberList from './NumberList';
import LocationList from './LocationList';
import useFetchState from '../util/useFetchState';
import getIdFromUrl from '../util/getIdFromUrl';
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import postMyBoard from '../util/postMyBoard'

const jwt = tokenService.getLocalAccessToken();


const App = () => {

  const id = getIdFromUrl(2);
  const username = jwtDecode(jwt).sub;
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
  const [built, setBuilt] = useState(false);
  const [totalRound, setTotalRound] = useState(null);
  const [match, setMatch] = useFetchState(
    [],
    `/api/v1/matches/${id}`,
    jwt, 
    setMessage,
    setVisible,
    id);
  const matchPlayerList = Array.apply(",", match.joinedPlayers);    
  let mainPlayer = matchPlayerList[(round+match.maxPlayers)%match.maxPlayers] === username;
  

  const [state, setState] = useState({
    numbers: Array.from({ length: matchPlayerList.length + 1 }, () => Math.floor(Math.random() * 6) + 1),
    isListVisible: true,
    isListLocationVisible: false,
    locationSelect: null,
    numberDice: null,
    locationCounters: {},
    availableLocations: ["MOUNTAIN", "CASTLE", "FIELD", "FOREST", "RIVER", "VILLAGE"],
  });

  // HANDLE MOSTRAR LISTA DE DADOS
  const handleShowListClick = useCallback(() => {
    setRound(round + 1);
    gameLayoutRef.current.resetBuiltHexagons();
    //Si el jugador principal es al que le toca elegir los dados se muestran los randoms
    if(matchPlayerList[(round+1+match.maxPlayers)%match.maxPlayers] === username){
      const listSize = state.numbers.length;
      const randomNumbers = Array.from({ length: listSize }, () => Math.floor(Math.random() * 6) + 1);
      setState({
        ...state,
        numbers: randomNumbers,
        isListVisible: true,
      });
      }//Si no es el jugador principal entonces seteará obtained a false para volver a obtener la siguiente ronda
      else{
        setObtained(false);
      }
  }, [gameLayoutRef, match, matchPlayerList, username, round, state]);

    useEffect(() => {
    // Solo inicializar el array numbers cuando match esté disponible
      if (match.maxPlayers) {
        setState((prevState) => ({
          ...prevState,
          numbers: Array.from({ length: match.maxPlayers + 1 }, () => Math.floor(Math.random() * 6) + 1),
        }));
      }
    }, [match]);


    useEffect(() => {
      setBuilt(gameLayoutRef.current.isCompleted());
      const obtainTotalRound = async () => {
        try {
          const response = await fetch(`/api/v1/rounds/${match.id}/${round}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          return data;
        } catch (error) {
        }
      };
      if (round === 0 && mainPlayer) {
        setObtained(true);
      }
      if(!obtained && !mainPlayer){
      const intervalId = setInterval(() => {
        obtainTotalRound()
          .then((result) => {
            if (result && result.subRound === round) {
              setTotalRound(result);
              setState({
                ...state,
                isListVisible: true,
                numbers: result.dices,
                locationSelect: result.territory
              })
              setObtained(true);
            } else if(result.hasEnd){
              
            }
          })
          .catch((error) => {
            console.error('Error obteniendo totalRound:', error);
          });
      }, 3000);
      if(obtained){
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId)
    }
    }, [round, mainPlayer, match, obtained, username, totalRound, setTotalRound, state, gameLayoutRef]);
    
  

   // HANDLE ELEGIR DADO
  const handleNumberClick = (clickedNumber) => {
    const newListSize = state.numbers.length - 1;
    let newRandomNumbers = Array.from({ length: newListSize }, () => Math.floor(Math.random() * 6) + 1);
    if(2>newListSize){
    newRandomNumbers = Array.from({ length: matchPlayerList.length + 1 }, () => Math.floor(Math.random() * 6) + 1);
  }
    
    //Si es el jugador principal entonces se mostrará la lista para elegir territorios
    if(mainPlayer){
    setState({
      ...state,
      numbers: newRandomNumbers,
      isListVisible: false,
      isListLocationVisible: true,
      numberDice: clickedNumber
    });
  } else {
        //Si no es el jugador principal entonces directamente se asignará el LocationSelect(Territorio elegido) al recibido de la base de datos
    setState({
      ...state,
      isListVisible: false,
      isListLocationVisible: false,
      numberDice: clickedNumber
    });
  }
};


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


  const handleEndGame = () => {
    gameLayoutRef.current.postHexagons(jwt, id, username);
  }



  // HANDLE PARA SELECCIONAR UN TERRITORIO DE LA LISTA
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
  };



  const rotationStyle = {
    transform: 'rotate(30deg)',
  };

  return (
    <div className="app">
      <HexGrid width={1000} height={900} viewBox="-80 -50 100 100" style={rotationStyle}>
        <GameLayout ref={gameLayoutRef}/>
      </HexGrid>
      <HexGrid width={500} height={1000} viewBox="-30 -0 100 100" >
        <TilesLayout locationCounters={state.locationCounters} updateNumberDice={updateNumberDice} numberDice={state.numberDice} locationSelect={state.locationSelect} />
      </HexGrid>
    
      {!state.isListVisible && !state.isListLocationVisible && obtained && state.numberDice === 0 &&(
        <button className="show-list-button" onClick={handleShowListClick}>
          Next round
        </button>
      )}
      <div>
      {built && 
      (<button className="show-button" onClick={handleEndGame}>
        FINALIZAR
      </button>)
      }
      </div>

      {!state.isListVisible && !state.isListLocationVisible && !obtained &&
      <div>Esperando al siguiente turno</div>}

      {((mainPlayer && state.isListVisible) || (!mainPlayer && totalRound!= null && round===totalRound.subRound && state.isListVisible)) && (
        <NumberList numbers={state.numbers} onNumberClick={handleNumberClick} />
      )}

      {state.isListLocationVisible && <LocationList availableLocations={state.availableLocations} onSelect={handleLocationSelect} />}
    </div>
  );
};

export default App;
