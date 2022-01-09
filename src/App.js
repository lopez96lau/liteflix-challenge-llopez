import './App.css'; 
import './normalize.css';
import 'typeface-bebas-neue';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Movies from './components/Movies';
import AddMovieModal from './components/AddMovieModal';

function App() {
  return (
    <div className="App">
      <Home />
      <Navigation />
      <Movies />
      <AddMovieModal />
    </div>
  );
}

export default App;
