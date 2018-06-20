import React from 'react';

import classes from './index.sass';

import CameraIcon from '../../assets/icons/cam.svg';
import LikeIcon from '../../assets/icons/like.svg';
import CommentIcon from '../../assets/icons/comments.svg';

const returnRightWord = (number,str1,str2,strMany) => {
  if(number === 1) {
    return str1;
  }
  else if(number > 1 && number < 5) {
    return str2;
  }
  else {
    return strMany;
  }
};

const stats = ({photos,likes,comments}) => (
  <ul className={classes.container}>
    <li className={classes.item}>
      <CameraIcon className={classes.icon}/>
      <div className={classes.number}>{photos}</div>
      <p className={classes.name}>{returnRightWord(photos,'Фотография','Фотографии','Фотографий')}</p>
    </li>
    <li className={classes.item}>
      <LikeIcon className={classes.icon}/>
      <div className={classes.number}>{likes}</div>
      <p className={classes.name}>{returnRightWord(likes,'Лайк','Лайка','Лайков')}</p>
    </li>
    <li className={classes.item}>
      <CommentIcon className={classes.icon}/>
      <div className={classes.number}>{comments}</div>
      <p className={classes.name}>{returnRightWord(comments,'Комментарий','Комментария','Комментариев')}</p>
    </li>
  </ul>
);

export default stats;