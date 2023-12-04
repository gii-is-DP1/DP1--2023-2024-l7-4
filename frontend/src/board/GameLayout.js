import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils } from 'react-hexgrid';
import './GameLayout.css';

class GameLayout extends Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(4);
    this.state = { hexagons};
  }
  //Son vecinos?
  areNeighbors(hex1, hex2) {
    return HexUtils.distance(hex1, hex2) === 1;
  }
  // onDrop you can read information of the hexagon that initiated the drag
  onDrop(event, source, targetProps) {
    const { hexagons } = this.state;
    // Verificar si el hexágono ya está en la lista de seleccionados
 
    // Actualizar el hexágono soltado
    const hexas = hexagons.map(hex => {
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.image = targetProps.data.image;
        hex.text = targetProps.data.text;
        hex.blocked = true;
        hex.build = true;
      } else if (hex.neighbor) {
        hex.blocked = false;
      } else {
        hex.blocked = true;
      }
      return hex;
    });
    
    const vecinos = hexas.map(hex => {
      if (this.areNeighbors(source.state.hex, hex) && !hex.build) {
        hex.image='/Desbloqueado.png'
        hex.text = '';
        hex.blocked= false
        hex.neighbor= true
      }
      return hex;
    });
  
    this.setState({ hexagons: vecinos});
  }

  onDragStart(event, source) {
    // If this tile is empty, let's disallow drag
    if (!source.props.data.text) {
      event.preventDefault();
    }
  }

  // Decide here if you want to allow drop to this node
  onDragOver(event, source) {
    // Find blocked hexagons by their 'blocked' attribute
    const blockedHexas = this.state.hexagons.filter(h => h.blocked);
    // Find if this hexagon is listed in blocked ones
    const blocked = blockedHexas.find(blockedHex => {
      return HexUtils.equals(source.state.hex, blockedHex);
    });

    const { text } = source.props.data;
    // Allow drop, if not blocked and there's no content already
    if (!blocked && !text) {
      // Call preventDefault if you want to allow drop
      event.preventDefault();
    }
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {
    if (!success) {  
      return;
    }
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns

    const { hexagons } = this.state;
    // When hexagon is successfully dropped, empty it's text and image
    const hexas = hexagons.map(hex => {
        if (HexUtils.equals(source.state.hex, hex)) {
          hex.text = null;
          hex.image = null;
        }
        return hex;
      });
      this.setState({ hexagons: hexas });
    }

  render() {
    let { hexagons } = this.state;
 
    return (
      <Layout className="game" size={{ x: 6, y: 6 }} flat={true} spacing={1.01} origin={{ x: -30, y: 0 }}>
        {
          hexagons.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              className={hex.blocked ? 'blocked': null}
              fill={(hex.image) ? HexUtils.getID(hex) : null}
              data={hex}
              onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onDrop={(e, h, t) => this.onDrop(e, h, t) }
              onDragOver={(e, h) => this.onDragOver(e, h) }
            >
              <Text>{hex.text || HexUtils.getID(hex)}</Text>
              { hex.image && <Pattern id={HexUtils.getID(hex)} link={hex.image} /> }
            </Hexagon>
          ))
        }
      </Layout>
    );
  }
}

export default GameLayout;