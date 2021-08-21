import logo from './logo.svg';
import './App.css';

function App() {

  const generateMap = () => {
    console.log('generating map');
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
        Map goes here
      </section>

    </div>
  );
}

export default App;
