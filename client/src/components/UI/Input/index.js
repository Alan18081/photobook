import React from 'react';

import classes from './index.sass';

const input = ({meta : {touched,error},input,placeholder,type,border,long,className}) => {
  const cssClasses = [classes.field,
    error && touched ? classes.error : null,
    border ? classes.border : null
  ];
  let inputItem = null;
  switch (type) {
    case 'textarea':
      inputItem = <textarea type={type} row={long ? '5' : '2'} className={cssClasses.join(' ')} {...input} placeholder={placeholder}></textarea>
      break;
    default:
      inputItem = <input type={type} className={cssClasses.join(' ')} {...input} placeholder={placeholder}/>
  }
  return (
    <div className={[classes.Input,className ? className : ''].join(' ')}>
      {inputItem}
      {touched && error && <div className={classes.errorMessage}>{error}</div>}
    </div>
  );
};

export default input;