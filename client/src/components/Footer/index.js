import React from 'react';

import classes from './index.sass';

import TopIcon from '../../assets/icons/top.svg';

const scrollToTop = (event) => {
  window.scrollBy(0,-10);
  if(document.documentElement.scrollTop > 0) {
    setTimeout(scrollToTop,5);
  }
};

const footer = ({src}) => (
  <footer className={classes.Footer} style={{
    backgroundImage: `url(${src})`
  }}>
    <div className={classes.container}>
      <div className={classes.info}>
        Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
      </div>
      <div className={classes.top}>
        <button onClick={scrollToTop} className={classes.topBtn}>
          <TopIcon/>
        </button>
      </div>
      <div className={classes.copyrights}>
        2016 | Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool
      </div>
    </div>
  </footer>
);

export default footer;