import React from 'react';

import classes from './index.sass';

import Button from '../UI/Button';

const formItemImage = ({error,changed,src,btnText,maxSize,background}) => (
  <div className={classes.container}>
      <div className={classes.preview}>
        <div className={[classes.image,background && classes.bgImage].join(' ')}>
          <img src={src} alt="Картинка"/>
        </div>
      </div>
      <div className={classes.controls}>
        <div className={classes.controlsContent}>
          <label className={classes.input}>
            <Button type="shadow">{btnText}</Button>
            <input type="file" onChange={changed}/>
          </label>
          <div className={classes.info}>
            (файл должен быть размером
            не более <span className={classes.formInfoBold}>{maxSize} КБ</span>)
          </div>
        </div>
        {error && <div className={classes.error}>{error}</div>}
      </div>
  </div>
);

export default formItemImage;