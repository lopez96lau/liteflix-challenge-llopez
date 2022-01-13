import React, { useState } from 'react';
import playIcon from '../../assets/play.svg';
import playIconMini from '../../assets/play-mini.svg';
import playIconMiniHover from '../../assets/play-mini-hover.svg';
import star from '../../assets/star.svg';
import styles from './MovieBox.module.css';

const MovieBox = ({title, image, rating, year}) => {
  const [style, setStyle] = useState({visibility: 'hidden'});
  const [mini, setMini] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.container} src={image} alt={title} />
      </div>

      <div className={styles.boxTop} onMouseEnter={e => {setStyle({visibility: 'visible'})}} onMouseLeave={e => {setStyle({visibility: 'hidden'})}}>
        <img src={playIcon} alt="" />
        <div className={styles.boxGradient} ></div>
      </div>

      <div>
        <div className={styles.boxBottom} style={style}>
          <div className={styles.title}  onMouseEnter={e => {setMini(true)}} onMouseLeave={e => {setMini(false)}}>
            <img src={mini ? playIconMiniHover : playIconMini } alt=""/>
            {title}
          </div>

          <div className={styles.info}>
            <div className={styles.rating}>
              <img src={star} alt=""></img>
              {rating}
            </div>
            {year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBox;