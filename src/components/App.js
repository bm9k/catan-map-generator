import './App.scss';
import MapGenerator from '../util/map-generator';
import { tileCounts, numberCounts, portCounts, portGeometries } from '../data/map';
import { useState } from 'react';
import GameMap from './GameMap';


function App() {
  const mapGenerator = new MapGenerator(tileCounts, numberCounts, portCounts, portGeometries);
  const [map, setMap] = useState(mapGenerator.generate());

  const generateMap = () => {
    const newMap = mapGenerator.generate();
    setMap(newMap);
  }

  const [width, height] = [640, 560];
  const size = 50;

  return (
    <div className="App">

      <header>
        <h1>Catan Map Generator</h1>
      </header>

      <section className="controls">
        <button className="generate" onClick={generateMap}>Generate</button>
      </section>

      <div className="map-container">
        <section className="map">
          <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
            <GameMap map={map} size={size} />
          </svg>
        </section>
      </div>

      <footer>
        <p>By Benjamin Martin</p>
      </footer>

    </div>
  );
}

export default App;
