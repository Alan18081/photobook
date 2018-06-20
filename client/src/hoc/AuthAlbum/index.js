import {connect} from 'react-redux';

import {
  getCurrentUser,
  getImages,
  getLikesNumber,
  getCommentsNumber
} from '../../selectors';
import {
  getAlbum,
  getActiveImage,
  resetAlbumOffset,
  incAlbumOffset,
  fetchImagesByAlbumId
} from '../../actions';

export default (AlbumPage) => {
  const mapStateToProps = state => ({
    loading: state.images.get('loading'),
    user: getCurrentUser(state),
    images: getImages(state),
    album: state.albums.get('activeAlbum'),
    likesNumber: getLikesNumber(state),
    commentsNumber: getCommentsNumber(state)
  });

  const mapDispatchToProps = dispatch => ({
    onGetAlbum: (id) => dispatch(getAlbum(id)),
    onGetActiveImage: (id) => dispatch(getActiveImage(id)),
    onResetAlbumOffset: () => dispatch(resetAlbumOffset()),
    onIncAlbumOffset: () => dispatch(incAlbumOffset()),
    onFetchImages: (id) => dispatch(fetchImagesByAlbumId(id))
   });

  return connect(mapStateToProps,mapDispatchToProps)(AlbumPage);
}

