import React from 'react';

import classes from './index.sass';

const spinner = ({size,center,color,fullHeight}) => {
  const wrapperClasses = [
    center ? classes.center : '',
    fullHeight ? classes.fullHeight : ''
  ];
  const spinnerClasses = [classes.loader,
    color === 'blue' ? classes.blue : ''
  ];
  return (
    <div className={wrapperClasses.join(' ')}>
      <div
        style={{
          fontSize: `${size}px`
        }}
        className={spinnerClasses.join(' ')}
      ></div>
    </div>
  );
}

export default spinner;