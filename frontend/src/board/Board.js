import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Path, Text, GridGenerator, HexUtils } from 'react-hexgrid';
import configs from './configurations';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    const config = configs['hexagon'];
    const generator = GridGenerator.getGenerator("hexagon");
    const hexagons = generator.apply(this, config.mapProps);
    this.state = { hexagons, config, path: { start: null, end: null } };

  }
    // onDrop you can read information of the hexagon that initiated the drag
    onDrop(event, source, targetProps) {
      const { hexagons } = this.state;
      const hexas = hexagons.map(hex => {
        // When hexagon is dropped on this hexagon, copy it's image and text
        if (HexUtils.equals(source.state.hex, hex)) {
          hex.image = targetProps.data.image;
          hex.text = targetProps.data.text;
        }
        return hex;
      });
      this.setState({ hexagons: hexas });
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

  onClick(event, source) {
    const { path } = this.state;
    if (path.start == null) {
      path.start = source.state.hex;
    }
    else {
      path.start = null;
      path.end = null;
    }
    this.setState({ path });
  }

  onMouseEnter(event, source) {
    // Set the path's end on hover
    const { path, hexagons } = this.state;
    const targetHex = source.state.hex;
    path.end = targetHex;

    // Color some hexagons
    const coloredHexas = hexagons.map(hex => {
      hex.props = hex.props || {};
      // Highlight tiles that are next to the target (1 distance away)
      hex.props.className = (HexUtils.distance(targetHex, hex) < 2) ? 'active' : ''; //el 2 se tiene que cambiar por la costante de los dados selecionados
      return hex;
    });

    this.setState({ path, hexagons: coloredHexas });
  }

  render() {
    const { hexagons, path, config } = this.state;
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };
    return (
      <div className="App">
        <HexGrid width={config.width} height={config.height} >
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
            {
              // note: key must be unique between re-renders.
              // using config.mapProps+i makes a new key when the goal template chnages.
              hexagons.map((hex, i) => (
                <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s}
                onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                onClick={(e, h) => this.onClick(e, h)}
                className={hex.props ? hex.props.className : null}>
                  <Text >{HexUtils.getID(hex)}</Text>
                </Hexagon>
              ))
            }
            <Path start={path.start} end={path.end} />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default App;