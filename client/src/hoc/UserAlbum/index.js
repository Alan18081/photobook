import {connect} from 'react-redux';

import {
  getCurrentUser,
  getActiveAlbum,
  getImages,
  getLikesNumber,
  getCommentsNumber
} from '../../selectors';
import {getAlbum,fetchUser} from '../../actions';

export default (AlbumPage) => {
  const mapStateToProps = state => ({
    userAlbum: true,
    loading: state.images.get('loading'),
    user: getCurrentUser(state),
    author: state.users,
    album: getActiveAlbum(state),
    images: getImages(state),
    likesNumber: getLikesNumber(state),
    commentsNumber: getCommentsNumber(state)
  });

  const mapDispatchToProps = dispatch => ({
    onFetchUser: (id) => dispatch(fetchUser(id)),
    onGetAlbum: (id) => dispatch(getAlbum(id))
  });

  return connect(mapStateToProps,mapDispatchToProps)(AlbumPage);
}

