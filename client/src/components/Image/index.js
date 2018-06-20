import React from 'react';

import classes from './index.sass';

import CommentIcon from '../../assets/icons/comments.svg';
import LikeIcon from '../../assets/icons/like.svg';
import EditIcon from '../../assets/icons/edit.svg';
import LoupeIcon from '../../assets/icons/loupe.svg';

const image = ({commentsNumber,likesNumber,image,name,show,edit,editable}) => (
  <div className={classes.container}>
    <div className={classes.image} onClick={show}>
      <div className={classes.overlay}>
        <LoupeIcon className={classes.overlayIcon}/>
      </div>
      <img src={image} alt=""/>
      <ul className={classes.stats}>
        <li className={classes.statsItem}>
          <div>
            <CommentIcon className={classes.statsIcon}/>
          </div>
          <span className={classes.statsNumber}>{commentsNumber}</span>
        </li>
        <li className={classes.statsItem}>
          <div>
            <LikeIcon className={classes.statsIcon}/>
          </div>
          <span className={classes.statsNumber}>{likesNumber}</span>
        </li>
      </ul>
    </div>
    <div className={classes.info}>
      {editable ? <EditIcon className={classes.infoIcon} onClick={edit}/> : null}
      <div className={classes.name}>
        {name}
      </div>
    </div>
  </div>
);

export default image;