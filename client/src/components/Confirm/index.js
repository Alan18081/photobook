import React from 'react';

import classes from './index.sass';

const confirm = ({agree,cancel,question}) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <div className={classes.question}>{question}</div>
      <div className={classes.controls} onClick={agree}>
        <button className={classes.agree}>
          Да
        </button>
        <button className={classes.cancel} onClick={cancel}>
          Отменить
        </button>
      </div>
    </div>
  </div>
);

export default confirm;