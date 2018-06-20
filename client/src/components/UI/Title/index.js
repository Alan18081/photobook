import React from 'react';

import classes from './index.sass';

const title = ({children,center}) => (
  <h2 className={[classes.Title,center ? classes.center : ''].join(' ')}>{children}</h2>
);

export default title;