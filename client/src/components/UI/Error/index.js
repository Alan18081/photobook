import React from 'react';

import classes from './index.sass';

const error = ({children}) => (
  <div className={classes.Error}>{children}</div>
);

export default error;