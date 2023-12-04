import React, { Component, useState } from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import TilesLayout from './TilesLayout';
import './App.css';
import NumberList from './NumberList';
import LocationList from './LocationList';


class App extends Component {
  
  constructor(props) {
    super(props);
    
    // Define el tamaño inicial de la lista
    const initialListSize = 6; // Cambia esto al tamaño deseado

    // Genera una lista de números aleatorios
    const randomNumbers = Array.from({ length: initialListSize }, () => Math.floor(Math.random() * 6) + 1);

    const locations = ["Montaña", "Castillo", "Campo", "Bosque", "Río", "Pueblo"];

    // Inicializa el estado con la lista de números y la visibilidad de la lista
    this.state = {
      numbers: randomNumbers,
      isListVisible: true,
      isListLocationVisible: false,
      locationSelect: null,
      numberDice: null,
      locationCounters: {},
      availableLocations: locations.slice(), // Inicializa la lista de ubicaciones disponibles
    };
    
  }

  // Maneja el clic en un número para eliminarlo de la lista y reducir el tamaño de la lista
  handleNumberClick = (clickedNumber) => {
    // Genera una nueva lista de números aleatorios de tamaño inferior
    const newListSize = this.state.numbers.length - 1;
    const newRandomNumbers = Array.from({ length: newListSize }, () => Math.floor(Math.random() * 6) + 1);

    this.setState({
      numbers: newRandomNumbers,
      isListVisible: false, // Oculta la lista cuando no hay más números
      isListLocationVisible: true,
      numberDice: clickedNumber
    });
  };
  // Maneja el clic en el botón para mostrar la lista nuevamente
  handleShowListClick = () => {
    // Genera una nueva lista de números aleatorios de tamaño inicial
    const randomNumbers = Array.from({ length: this.state.numbers.length }, () => Math.floor(Math.random() * 6) + 1);

    this.setState({
      numbers: randomNumbers,
      isListVisible: true,
    });
  };
  // Definir la función para actualizar el estado de numberDice
  updateNumberDice = () => {
    // Obtener el valor actual de numberDice del estado
    const currentNumberDice = this.state.numberDice;

    // Verificar si currentNumberDice es mayor que 0 antes de reducirlo
    if (currentNumberDice > 0) {
      // Reducir el valor de numberDice en 1 y actualizar el estado
      this.setState({
        numberDice: currentNumberDice - 1,
      });
    }
  };
  handleLocationSelect = (selectedLocation) => {
    const { locationCounters, availableLocations } = this.state;
    // Aquí puedes realizar acciones adicionales según la selección, si es necesario.
    this.setState(prevState => ({
      isListLocationVisible: false,
      locationSelect: selectedLocation,
      locationCounters: {
        ...prevState.locationCounters,
        [selectedLocation]: (prevState.locationCounters[selectedLocation] || 0) + 1
      }
    }));
    // Verifica si la ubicación se ha seleccionado más de 3 veces
    if (locationCounters[selectedLocation] >= 3) {
      // Elimina la ubicación de la lista de ubicaciones disponibles
      const updatedLocations = availableLocations.filter((location) => location !== selectedLocation);
      this.setState({
        availableLocations: updatedLocations,
  });
}
};

  render() {
    const rotationStyle = {
      transform: 'rotate(30deg)',
    };

    return (
      <div className="app">
        <HexGrid width={1000} height={900} viewBox="-80 -50 100 100" style={rotationStyle}>
          <GameLayout />
        </HexGrid>
        <HexGrid width={500} height={1000} viewBox="-30 -0 100 100" >
          <TilesLayout locationCounters={this.state.locationCounters} updateNumberDice={this.updateNumberDice} numberDice ={this.state.numberDice} locationSelect={this.state.locationSelect} />
        </HexGrid>
        {/* Renderiza el botón solo si la lista no es visible */}
        {!this.state.isListVisible && !this.state.isListLocationVisible &&  (
          <button className="show-list-button" onClick={this.handleShowListClick}>
            Next round
          </button>
        )}
        {/* Renderiza la lista de números en medio de la pantalla */}
        {this.state.isListVisible && (
          <NumberList numbers={this.state.numbers} onNumberClick={this.handleNumberClick} />
        )}
        {this.state.isListLocationVisible &&  <LocationList availableLocations={this.state.availableLocations} onSelect={this.handleLocationSelect} />}
      </div>
    );
  }
}

export default App;
