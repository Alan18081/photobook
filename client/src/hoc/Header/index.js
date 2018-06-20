import React from 'react';

import classes from './index.sass';

const header = ({src,children}) => (
  <header className={classes.bg} style={{
    backgroundImage: `url(${src})`
  }}>
    <div className={classes.container}>
      {children}
    </div>
  </header>
);

export default header;