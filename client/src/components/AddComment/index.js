import React from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import {validateComment} from '../../utils/validate';

import classes from './index.sass';
import {addComment} from '../../actions';

import Input from '../UI/Input';
import Button from '../UI/Button';

const addCommentItem = ({handleSubmit,username,avatar,onAddComment,imageId}) => {
  const addCommentHandler = (values) => onAddComment(imageId,values);
  return (
    <form onSubmit={handleSubmit(addCommentHandler)} className={classes.container}>
      <div className={classes.avatar}>
        <img src={avatar} alt="Фото"/>
      </div>
      <div className={classes.content}>
        <div className={classes.username}>{username}</div>
        <Field name="text" component={Input} placeholder="Добавить комментарий" border/>
        <Button type="shadow">Добавить</Button>
      </div>
    </form>
  );

};

// const mapStateToProps = state => ({
//   albumId: state.albums.get('activeAlbum').get('_id')
// });

const mapDispatchToProps = dispatch => ({
  onAddComment: (userAlbum,albumId,imageId,comment) => dispatch(addComment(userAlbum,albumId,imageId,comment))
});

export default connect(null,mapDispatchToProps)(
  reduxForm({
    form: 'addComment',
    validate: validateComment
})(addCommentItem));