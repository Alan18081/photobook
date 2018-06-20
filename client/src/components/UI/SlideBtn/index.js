import React from 'react';

import classes from './index.sass';

const slideBtn = ({hoverClass,clicked,children,Icon}) => {
  const cssClasses = [classes.btn,hoverClass ? hoverClass : ''];
  return (
    <div className={cssClasses.join(' ')}>
      <Icon className={classes.icon}/>
      <div className={classes.hover} onClick={clicked}>
        <Icon className={classes.hoverIcon}/>
        <p className={classes.text}>{children}</p>
      </div>
    </div>
  )
};

export default slideBtn;