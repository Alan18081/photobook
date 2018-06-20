import React from 'react';

import classes from './index.sass';

import Input from '../UI/Input';

const formItem = ({meta,input,caption,type}) => (
  <label className={[classes.container,type === 'textarea' ? classes.fieldTextarea : ''].join(' ')}>
    <div className={classes.caption}>{caption}</div>
    <Input meta={meta} input={input} type={type} border className={classes.field}/>
  </label>
);

export default formItem;