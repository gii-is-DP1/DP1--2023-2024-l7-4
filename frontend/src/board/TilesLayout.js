import React, { Component } from 'react';
import {Layout, Hexagon, Text, Pattern, HexUtils } from 'react-hexgrid';
import './TilesLayout.css';

class TilesLayout extends Component {
  constructor(props) {
    super(props);
    // Initialize hexagons with some text and image
    const locations = ["Montaña", "Castillo", "Campo", "Bosque", "Río", "Pueblo"];

    const hexagons = locations.map((location, index) => {
      return {
        q: -index*0.5,
        r: index,
        s: 0,
        text: location,
        image: `/territorio${index % 10}.png`
      };
    });
    this.state = { hexagons };
  }

  onDragStart(event, source) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {
    if (!success) {
      return;
    }
    const { hexagons } = this.state;
    const { updateNumberDice } = this.props; // Obtener la función de actualización desde las props

    const hexas = hexagons.map(hex => {
      if (HexUtils.equals(source.state.hex, hex)) {
        // Llamar a la función de actualización para reducir numberDice en 1
        updateNumberDice();
      }
      return hex;
    });
    this.setState({ hexagons: hexas });
  }
  

  render() {
    const { hexagons } = this.state;
    const locationSelect = this.props.locationSelect;
    const numberDice = this.props.numberDice
    

    // Filtra los hexágonos para mostrar solo los que tienen el mismo texto que locationSelect
    const filteredHexagons = hexagons.filter(hex => hex.text === locationSelect);

    return (
      <Layout className="tiles" size={{ x: 10, y: 10 }} flat={false} spacing={1.5} origin={{ x: 0, y: 0 }}>
        {numberDice>0 &&
          filteredHexagons.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={(hex.image && hex.text) ? HexUtils.getID(hex) : null}
              data={hex}
              onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
            >
              <Text>{numberDice}</Text>
              {hex.image && <Pattern id={HexUtils.getID(hex)} link={hex.image} />}
            </Hexagon>
          ))
        }
      </Layout>
    );
  }
}

export default TilesLayout;