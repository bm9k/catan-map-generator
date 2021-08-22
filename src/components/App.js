import './App.css';
import MapGenerator from '../util/map-generator';
import { tileCounts, numberCounts } from '../data/map';
import { useState } from 'react';
import GameMap from './GameMap';


function App() {
  const mapGenerator = new MapGenerator(tileCounts, numberCounts);
  const [map, setMap] = useState(mapGenerator.generate());

  const generateMap = () => {
    const newMap = mapGenerator.generate();
    setMap(newMap);
  }

  const [width, height] = [800, 480];
  const size = 50;

  return (
    <div className="App">
      <header>
        <h1>Catan Map Generator</h1>
      </header>

      <section id="controls">
        <button onClick={generateMap}>Generate</button>
      </section>
      <section id="map">
        <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
          <GameMap map={map} size={size}/>
        </svg>
      </section>

    </div>
  );
}

export default App;
