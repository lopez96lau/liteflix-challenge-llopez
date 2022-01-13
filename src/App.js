import './App.css'; 
import './normalize.css';
import 'typeface-bebas-neue';
import Navigation from './components/Navigation';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
    </div>
  );
}

export default App;
