import React from 'react';

import classes from './index.sass';

import CloseIcon from '../../../assets/icons/close.svg';

import Controls from '../Controls';

const modal = ({children,title,hide,save,long,controls,head}) => (
  <div className={classes.bg}>
    <div className={classes.popup}>
      {head ? <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        <button className={classes.close} onClick={hide}>
          <CloseIcon/>
        </button>
      </div> : null}
      <div className={classes.content}>
        {children}
      </div>
      {controls ? <Controls
        save={save}
        cancel={hide}
      /> : null}
    </div>
  </div>
);

export default modal;