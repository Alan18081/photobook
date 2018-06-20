import React from 'react';
import {Link} from 'react-router-dom';

import classes from './index.sass';

import Title from '../../components/UI/Title';
import Button from '../../components/UI/Button';

import NotFoundIcon from '../../assets/icons/error-404.svg';

const pageNotFound = () => (
  <div className={classes.container}>
    <div className={classes.content}>
      <Title>Страница не найдена</Title>
      <NotFoundIcon className={classes.icon}/>
      <div className={classes.btn}>
        <Link to="/">
          <Button type="shadow">На главную</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default pageNotFound;