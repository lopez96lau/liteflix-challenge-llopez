import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { VscPlay } from "react-icons/vsc";
import { Animated } from "react-animated-css";
import axios from 'axios';
import styles from './Home.module.css';
import Movies from '../Movies';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/original/";
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY
});

const Home = () => {
  const [movies, setMovies] = useState([]);
  var featuredMovie;

  useEffect(() => {
    client.get()
      .then(response =>{
        // Filter long titles in order to avoid UI malfunctions
        setMovies(response.data.results.filter(movie => movie.title.length < 15));
      })
      .catch(error =>{
        console.log(error);
      });
  }, []);

  // Select a random movie to show as Featured Title
  function setFeaturedMovie() {
    var size = movies.length;
    featuredMovie = movies[Math.floor(Math.random()*size)];
    return featuredMovie;
  }

  setFeaturedMovie();

  return (
    <div className={styles.home}>
      <div className={styles.innerSection}>
        <img className={styles.featuredBackground} src={movies.length && IMG_URL + featuredMovie.backdrop_path } alt="" />
        <div className={styles.title}>
          <Animated animationIn="fadeInDown" animationInDuration={1400} isVisible={true}>
            <div className={styles.movieLegend}>ORIGINAL DE <b>LITEFLIX</b></div>
            <div className={styles.movieTitle}>{movies.length && featuredMovie.title }</div>
          </Animated>
          <Animated animationIn="pulse" animationInDuration={1400} isVisible={true}>
          <div className={styles.movieActions}>
              <button className={styles.playButton}>
                <VscPlay className={styles.movieIcon} />
                REPRODUCIR
              </button>
            <button className={styles.addButton}>
              <AiOutlinePlus className={styles.movieIcon} />
              MI LISTA
            </button>
          </div>
          </Animated>
        </div>
      </div>
      <Movies />
    </div>
  );
}

export default Home;