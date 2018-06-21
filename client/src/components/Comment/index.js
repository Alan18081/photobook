import React from 'react';

import classes from './index.sass';

const comment = ({avatar,username,text}) => (
  <div className={classes.container}>
    <div className={classes.avatar}>
      <img src={avatar} alt=""/>
    </div>
    <div className={classes.content}>
      <div className={classes.username}>{username}</div>
      <p className={classes.text}>
        {text}
      </p>
    </div>
  </div>
);

export default comment;