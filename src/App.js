import './App.css'; 
import './normalize.css';
import 'typeface-bebas-neue';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddMovieModal from './components/AddMovieModal';

function App() {
  return (
    <div className="App">
      <AddMovieModal />
      <Navigation />
      <Home />
    </div>
  );
}

export default App;
