import React from 'react';

import classes from './index.sass';

const button = ({type,color,children,clicked,fluid,icon}) => {
  const cssClasses = [classes.btn,
    type === 'shadow' ? classes.shadow : null,
    color === 'red' ? classes.red : null,
    icon ? classes.icon : null,
    fluid ? classes.fluid : null
  ];
  return (
    <button onClick={clicked} className={cssClasses.join(' ')}>{children}</button>
  );
};

export default button;