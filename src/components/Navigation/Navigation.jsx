import React from 'react';
import Avatar from 'react-avatar';
import { AiOutlinePlus } from 'react-icons/ai';
import { Animated } from "react-animated-css";
import AddMovieModal from '../AddMovieModal';
import liteflixLogo from '../../assets/liteflix.svg';
import addMovie from '../../assets/mobile-plus.svg';
import menu from '../../assets/menu.svg';
import notification from '../../assets/notification.svg';
import styles from './Navigation.module.css';
import { modal } from 'react-modal-dom';

const Navigation = () => {

  function handleOpenModal(){
    modal.open(<Animated animationIn="fadeIn" animationInDuration={400} isVisible={true}><AddMovieModal /></Animated>);
  }

  return (
    <div className={styles.navigation}>
      <img className={styles.addMovieMobileButton} src={addMovie} alt="add-movie" onClick={handleOpenModal} />

      <Animated animationIn="fadeInUp" animationInDuration={1400} isVisible={true}>
      <div className={styles.primarySection}>
        <img className={styles.liteflixLogo} src={liteflixLogo} alt="liteflix-logo" />
        <a className={styles.addMovieButton} type="button" onClick={handleOpenModal}>
          <AiOutlinePlus className={styles.addMovieIcon} />
          Agregar Película
        </a>
      </div>
      </Animated>

      <Animated animationIn="fadeInUp" animationInDuration={1400} isVisible={true}>
      <div className={styles.secondarySection}>
        <img className={styles.desktopImage} src={menu} alt="menu" />
        <img className={styles.desktopImage} src={notification} alt="notifications" />
        <Avatar githubHandle="lopez96lau" size="40" round={true} />
      </div>
      </Animated>
    </div>
  );
}

export default Navigation;