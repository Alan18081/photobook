import React from 'react';

import classes from './index.sass';

const userBlock = ({avatar,username,dark}) => (
  <div className={[classes.user,dark ? classes.userDark : ''].join(' ')}>
    <div className={classes.userAvatar}>
      <img src={avatar} alt=""/>
    </div>
    <div className={classes.username}>{username}</div>
  </div>
);

export default userBlock;