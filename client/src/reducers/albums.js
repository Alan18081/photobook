import {fromJS} from 'immutable';
import {
  ADD_ALBUM_IDS,
  FETCH_ALBUM_SUCCESS,
  GET_ALBUM_SUCCESS,
  CREATE_ALBUM_SUCCESS,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILED,
  DELETE_ALBUM_SUCCESS,
  UPDATE_ALBUM_SUCCESS,
  INC_ALBUM_OFFSET,
  RESET_ALBUM_OFFSET
} from '../actions/types';

const initialState = fromJS({
  list: fromJS([]),
  activeAlbum: null,
  userActiveAlbum: null,
  offset: 0
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case INC_ALBUM_OFFSET:
      return state.set(
        'offset',
        state.get('offset') + 9
      );
    case RESET_ALBUM_OFFSET:
      return state.set('offset',0);
    case ADD_ALBUM_IDS:
      return state.update(
        'list',
        albums => albums.update(
          albums.findIndex(album => album.get('_id') === payload.albumId),
          album => album.get('images').concat(fromJS(payload))
        )
      );
    case FETCH_ALBUM_SUCCESS:
      return state.set(
        'list',
        state.get('list').push(fromJS(payload))
      );
    case UPDATE_ALBUM_SUCCESS:
      const oldAlbums = state.get('list');
      const updatedAlbums = oldAlbums
        .set(
          oldAlbums.findIndex(item => item.get('_id') === payload._id),
          fromJS(payload)
        );
      return state.merge({
        albums: updatedAlbums,
        activeAlbum: fromJS(payload)
      });
    case DELETE_ALBUM_SUCCESS:
      return state.merge({
        list: state.get('list').filter((item) => item.get('_id') !== payload),
        activeAlbum: null
      });
    case FETCH_ALBUMS_SUCCESS:
      return state.set(
        'list',
        state.get('list').concat(fromJS(payload)));
    case FETCH_ALBUMS_FAILED:
      return state.set('fetchAlbumsError',payload);
    case GET_ALBUM_SUCCESS:
      return state.merge({
        activeAlbum: fromJS(payload)
      });
    case CREATE_ALBUM_SUCCESS:
      const albums = state.get('list');
      return state.set('list',albums.push(fromJS(payload)));
    default:
      return state;
  }
}