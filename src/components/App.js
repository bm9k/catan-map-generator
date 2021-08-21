import './App.css';
import MapGenerator from '../util/map-generator';
import { tileCounts, numberCounts } from '../data/map';
import { useState } from 'react';


function App() {
  const mapGenerator = new MapGenerator(tileCounts, numberCounts);
  const [map, setMap] = useState(mapGenerator.generate());

  const generateMap = () => {
    const newMap = mapGenerator.generate();
    setMap(newMap);
  }

  return (
    <div className="App">
      <header>
        <h1>Catan Map Generator</h1>
      </header>
      
      <section id="controls">
        <button onClick={generateMap}>Generate</button>
      </section>
      <section id="map">
        <pre><code>{[...map.entries()].map((entry) => JSON.stringify(entry) + "\n")}</code></pre>
      </section>

    </div>
  );
}

export default App;
