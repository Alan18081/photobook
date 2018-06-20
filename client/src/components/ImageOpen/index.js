import React from 'react';
import {connect} from 'react-redux';

import classes from './index.sass';
import {likeImage} from '../../actions';
import {getCurrentUser} from '../../selectors';

import UserBlock from '../../components/UserBlock';
import CommentsList from '../../components/CommentsList';

import LikeIcon from '../../assets/icons/no_like.svg';

const isLiked = (likes,id) => {
  return !!likes.find(userId => userId === id);
};

const imageOpen = ({userAlbum,user,author,id,image,likes,title,description,onLike,comments}) => {
  const likeHandler = () => onLike(id);
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={image} alt="Картинка"/>
      </div>
      <div className={classes.info}>
        <div className={classes.head}>
          <UserBlock
            dark
            username={author.get('username')}
            avatar={author.get('avatarUrl')}
          />
          <div className={[classes.likes,isLiked(likes,user.get('_id')) ? classes.likesActive : ''].join(' ')} onClick={likeHandler}>
            <LikeIcon className={classes.likesIcon}/>
            <div className={classes.likesNumber}>{likes.size}</div>
          </div>
        </div>
        <div>
          <h4 className={classes.title}>{title}</h4>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
      <CommentsList
        userAlbum={userAlbum}
        imageId={id}
        comments={comments}
        username={user.get('username')}
        avatar={user.get('avatar')}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  onLike: (id,userAlbum) => dispatch(likeImage(id,userAlbum))
});

export default connect(mapStateToProps,mapDispatchToProps)(imageOpen);