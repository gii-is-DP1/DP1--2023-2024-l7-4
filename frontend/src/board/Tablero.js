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
    hasEnd: false,
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

      const randomNumbers = Array.from({ length: listSize<=1?matchPlayerList.length + 1:listSize }, () => Math.floor(Math.random() * 6) + 1);
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
            } if(result.hasEnd){
              handleEndGame();
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

    }, [round, mainPlayer, match, obtained, username,totalRound, setTotalRound, state, gameLayoutRef]);
    
  

   // HANDLE ELEGIR DADO
  const handleNumberClick = (clickedNumber) => {

    //Si es el jugador principal entonces se mostrará la lista para elegir territorios
    if(mainPlayer){
      const newListSize = state.numbers.length - 1;
      const indexToRemove = state.numbers.indexOf(clickedNumber);
      state.numbers.splice(indexToRemove,1);
      let newNumbers = state.numbers;
      if(newListSize===0){
        newNumbers = Array.from({ length: matchPlayerList.length + 1 }, () => Math.floor(Math.random() * 6) + 1);
      }
    setState({
      ...state,
      numbers: newNumbers,
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
      numberDice: clickedNumber,
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

// FUNCIÓN PARA UPDATEAR LOS TERRITORIOS QUE QUEDAN POR CONSTRUIR
  const updateNumberDice = () => {
    const currentNumberDice = state.numberDice;
    if (currentNumberDice > 0) {
      setState({
        ...state,
        numberDice: currentNumberDice - 1,
      });
    }
  };

  //FUNCION PARA POSTEAR EL TABLERO
  const handleEndGame = () => {
    gameLayoutRef.current.postHexagons(jwt, id, username);
  }


  const checkIfFinalRoundExists = () => {
    try {
      const response = fetch(`/api/v1/rounds/${match.id}/${round + 1}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const status = response.status;
      return status === 200;
    } catch (error){
      return false;
    }
  };

  //FUNCION PARA HACER POST DE LA RONDA PARA INDICAR QUE SE HA ACABADO EL JUEGO
  const postRound = () => {
      emptyRound.match = match;
      emptyRound.subRound = round + 1;
      emptyRound.mainPlayer = username;
      emptyRound.dices = state.numbers;
      emptyRound.territory = "CASTLE";
      emptyRound.hasEnd = true;
      return fetch('/api/v1/rounds', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(emptyRound),
    })
  };

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
    }).catch((error) => {
      return handleEndGame();
    });

  if (locationCounters[selectedLocation] >= 3) {
    const updatedLocations = availableLocations.filter((location) => location !== selectedLocation);
    setState({
      ...state,
      availableLocations: updatedLocations,
    });
    }
  };


  const handleFinalizarClick = () => {
    if(!checkIfFinalRoundExists()){
      postRound();
    }
    handleEndGame();  
  }

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
    
      {!state.isListVisible && !state.isListLocationVisible && obtained && state.numberDice === 0 && !built &&(
        <button className="show-list-button" onClick={handleShowListClick}>
          Next round
        </button>
      )}

      {built && 
      (<button className="show-button" onClick={handleFinalizarClick}>
        FINALIZAR
      </button>)
      }

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