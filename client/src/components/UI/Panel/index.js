import React from 'react';

import classes from './index.sass';

import CloseIcon from '../../../assets/icons/close.svg';

import Title from '../Title';

const panel = ({title,children,close}) => (
  <div className={classes.container}>
    <Title center>{title}</Title>
    <div className={classes.panel}>
      <div className={classes.close} onClick={close}>
        <CloseIcon className={classes.closeIcon}/>
      </div>
      {children}
    </div>
  </div>
);

export default panel;