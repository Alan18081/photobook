import React from 'react';

import classes from './index.sass';

const input = ({Icon,input,meta: {error,touched},type,placeholder,resetPassword}) => {
  const cssClasses = [classes.AuthInput,
    resetPassword && classes.resetField,
    error && touched && classes.inputError
  ];
  return (
    <div className={resetPassword ? classes.reset : ''}>
      <label className={cssClasses.join(' ')}>
        <input className={classes.field} type={type} placeholder={placeholder} {...input}/>
        <Icon className={classes.icon}/>
      </label>
      {error && touched && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default input;