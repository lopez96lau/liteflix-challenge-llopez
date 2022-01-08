import './App.css'; 
import './normalize.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Movies from './components/Movies';
import AddMovieModal from './components/AddMovieModal';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
      <Movies />
      <AddMovieModal />
    </div>
  );
}

export default App;
