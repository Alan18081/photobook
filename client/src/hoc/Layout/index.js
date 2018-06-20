import React from 'react';

import classes from './index.sass';

import Footer from '../../components/Footer';

const layout = ({children,footerBg}) => (
  <div className={classes.container}>
    <main>
      {children}
    </main>
    <div className={classes.footer}>
      <Footer src={footerBg}/>
    </div>
  </div>
);

export default layout;