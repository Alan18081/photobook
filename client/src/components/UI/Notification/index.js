import React from 'react';

import classes from './index.sass';

import Button from '../Button';

const notification = ({close,title,btn}) => (
  <div className={classes.container}>
    <div className={classes.content}>
      {title}
    </div>
    <div className={classes.controls}>
      <Button type="shadow" clicked={close}>{btn}</Button>
    </div>
  </div>
);

export default notification;