import React from 'react';
import Avatar from 'react-avatar';
import { modal } from 'react-modal-dom';
import { Animated } from "react-animated-css";
import { VscChromeClose } from "react-icons/vsc";
import addMovie from '../../assets/mobile-plus.svg';
import liteflix from '../../assets/liteflix-mini.svg';
import styles from './SuccessModal.module.css';

const SuccessModal = ({title}) => {
  function handleCloseModal(){
    modal.close();
  }

  return (
    <div className={styles.addMovieModal}>

      <div className={styles.mobileHeader}>
        <img style={{visibility: "hidden"}} src={addMovie} alt="add-movie" />
        <img src={liteflix} alt="liteflix-logo" />
        <Avatar githubHandle="lopez96lau" size="40" round={true} />
      </div>
      
      <div className={styles.closeButton} onClick={handleCloseModal}><a><VscChromeClose /></a></div>
      <img src={liteflix} alt="logo" id="logo"/>
      <Animated animationIn="fadeInUp" animationInDuration={800} isVisible={true}>
      <div className={styles.message}>
        <h1>¡FELICITACIONES!</h1>
        {title} FUE CORRECTAMENTE SUBIDA.
      </div>
      </Animated>

      <div className={styles.actions}>
        <button onClick={handleCloseModal}>IR A HOME</button>
      </div>
    </div>
  );
}

export default SuccessModal;