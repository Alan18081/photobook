import React, {Component} from 'react';
import {connect} from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import classes from './index.sass';

import DownIcon from '../../assets/icons/arrow_left.svg';

import AddComment from '../AddComment';
import Comment from '../Comment';

class CommentsList extends Component {
  state = {
    shownComments: true
  };
  toggleComments = () => {
    this.setState({
      shownComments: !this.state.shownComments
    })
  };
  addCommentHandler = (values) => {
    console.log(values);
  };
  render() {
    const {comments} = this.props;
    return (
      <div className={classes.container}>
        <button className={classes.toggle} onClick={this.toggleComments}>
          <span className={classes.toggleText}>Комментарии</span>
          <DownIcon className={classes.toggleIcon}/>
        </button>
        <CSSTransition
          in={this.state.shownComments}
          timeout={500}
          classNames={{
            enter: classes.contentEnter,
            enterActive: classes.contentEnterActive,
            exit: classes.contentExit,
            exitActive: classes.contentExitActive
          }}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.body}>
            <AddComment
              userAlbum={this.props.userAlbum}
              imageId={this.props.imageId}
              avatar={this.props.avatar}
              username={this.props.username}
              addComment={this.addCommentHandler}
              albumId={this.props.albumId}
            />
            {comments.size > 0 && comments.reverse().map(comment => (
                <Comment
                  key={Math.random()}
                  avatar={comment.get('sender').get('avatarUrl')}
                  username={comment.get('sender').get('username')}
                  text={comment.get('text')}
                />
            ))}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = ({albums}) => ({
  album: albums.get('activeAlbum')
});

export default connect(mapStateToProps)(CommentsList);