import React from 'react';
import {Link} from 'react-router-dom';

import classes from './index.sass';

import EditIcon from '../../assets/icons/edit.svg';

const album = ({name,background,id,own,authorId}) => {
  let path = `/user/${authorId}/albums/${id}`;
  if(own) {
    path = `/albums/${id}`;
  }
  return (
    <Link to={path} className={classes.container}>
      <div className={classes.image}>
        <img src={background} alt="Фон альбома"/>
      </div>
      <div className={classes.info}>
        <EditIcon/>
        <div className={classes.name}>
          {name}
        </div>
      </div>
    </Link>
  );
};

export default album;