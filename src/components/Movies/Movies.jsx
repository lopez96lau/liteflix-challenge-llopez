import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Dropdown } from 'reactjs-dropdown-component';
import MovieBox from '../MovieBox';
import axios from 'axios';
import styles from './Movies.module.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY
});

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [source, setSource] = useState("featured");
  
  const movieSource = [
    {
      label: 'Populares',
      value: 'featured',
    },
    {
      label: 'Mis Películas',
      value: 'myMovies',
    },
  ];

  useEffect(() => {
    client.get()
      .then(response =>{
        // Filter long titles in order to avoid UI malfunctions
        let moviesData = response.data?.results?.filter(movie => movie.name.length < 15 && movie.backdrop_path);
        setMovies(moviesData);
        setFeatured(moviesData);
      })
      .catch(error =>{
        console.log(error);
      });
  }, []);

  // Select X random movies from an array of movies
  function selectPopularMovies(movies, x) {
    var popularMovies = movies.sort(() => .5 - Math.random()).slice(0,x);
    return popularMovies;
  }

  function selectSource(s){
    setSource(s.value);
    if (s.value == "featured") {
      setMovies(featured);
    } else {
      const items = { ...localStorage };
      var myMovies = [];
      Object.keys(items).forEach(key => {
        var movieData = {
          name: key,
          image: localStorage.getItem(key),
          rating: "N/A",
          year: ""
        }
        myMovies.push(movieData);
      });
      setMovies(myMovies);
    }
  }

  function getMovieImage(movie){
    return source == "featured" ? IMG_URL + movie.backdrop_path : movie.image;
  }

  function getMovieRating(movie){
    return source == "featured" ? movie.vote_average : movie.rating;
  }

  function getMovieYear(movie){
    return source == "featured" ? movie.first_air_date.slice(0,4) : movie.year;
  }

  return (
    <div className={styles.movies}>
      <div className={styles.topGradient}></div>
    
      <div className={styles.movieList}>
        <div className={styles.movieListSelector}>
          <Dropdown
            name="source"
            title="POPULARES"
            list={movieSource}
            onChange={selectSource.bind(this)}
            select={{value: 'featured'}}
            styles={{
              wrapper: {color:"#FFFFFF"},
              header: {
                backgroundColor: "transparent",
                border: "none",
                fontsize: "1.125rem",
                letterSpacing: "0.25rem",
              },
              headerTitle: {
                margin: "0",
                fontSize: "1.125rem",
                fontWeight: "bold",
                paddingLeft: "0.25rem",
              },
              list: {
                backgroundColor: "#242424",
                border: "none",
                boxShadow: "none",
              },
              listItem: {
                backgroundColor: "transparent",
                border: "none",
                overflow: "hidden",
                fontSize: "16px",
                letterSpacing: "0.25rem",
                fontWeight: "lighter",
                display: "flex",
                justifyContent: "space-between",
                padding: "0.469rem 1.25rem"
              },
              scrollList: {overflow: "hidden" },
            }}
          />
        </div>

         {movies.length && selectPopularMovies(movies, 4).map((movie, i) => (
           <Animated animationIn="pulse" animationInDuration={1200} isVisible={true} key={i}>
              <MovieBox
                title={movie.name}
                image={getMovieImage(movie)}
                rating={getMovieRating(movie)}
                year={getMovieYear(movie)}
              />
           </Animated>
         ))}
      </div>
    </div>
  );
}

export default Movies;