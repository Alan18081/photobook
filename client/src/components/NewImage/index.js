import React from 'react';
import {Link} from 'react-router-dom';
import classes from './index.sass';

import LoupeIcon from '../../assets/icons/loupe.svg';
import MoreIcon from '../../assets/icons/more.svg';
import CommentIcon from '../../assets/icons/comments.svg';
import LikeIcon from '../../assets/icons/like.svg';
import AlbumIcon from '../../assets/icons/album.svg';

const newImage = ({show,image,name,albumName,author,commentsNumber,likesNumber}) => {
  return (
    <div className={classes.container} onClick={show}>
      <div className={classes.image}>
        <img src={image} alt=""/>
        <div className={classes.imageOverlay}>
          <LoupeIcon/>
        </div>
      </div>
      <div className={classes.info}>
        <Link to={`/users/${author.get('_id')}`} className={classes.user}>
          <img src={`/uploads/${author.get('avatar')}`} alt=""/>
          <div className={classes.userOverlay}>
            <MoreIcon/>
          </div>
        </Link>
        <div className={classes.caption}>
          <h4 className={classes.name}>{name}</h4>
          <ul className={classes.stats}>
            <li className={classes.statsItem}>
              <CommentIcon/>
              <span className={classes.statsNumber}>{commentsNumber}</span>
            </li>
            <li className={classes.statsItem}>
              <LikeIcon/>
              <span className={classes.statsNumber}>{likesNumber}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.album}>
        <AlbumIcon/>
        <div className={classes.albumName}>{albumName}</div>
      </div>
    </div>
  );
};

export default newImage;