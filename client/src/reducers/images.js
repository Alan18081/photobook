import {fromJS} from 'immutable';
import {
  FETCH_IMAGES_START,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGES_BY_ALBUM_ID,
  UPDATE_IMAGE_SUCCESS,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGE_SUCCESS,
  GET_ACTIVE_IMAGE
} from '../actions/types';

const initialState = fromJS({
  list: fromJS([]),
  activeImage: null,
  loading: false
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case FETCH_IMAGES_START:
      return state.set('loading',true);
    case FETCH_IMAGE_SUCCESS:
      return state.merge({
        list: state.get('list')
          .push(fromJS(payload))
          .groupBy(img => img.get('_id'))
          .map(item => item.first())
          .toList(),
        loading: false
      });
    case DELETE_IMAGES_BY_ALBUM_ID:
      return state.set(
        'list',
        state.get('list').filter(img => img.get('albumId') !== payload)
      );
    case DELETE_IMAGE_SUCCESS:
      const delImages = state.get('list').filter(img => img.get('_id') !== payload);
      return state.set('list',delImages);
    case GET_ACTIVE_IMAGE:
      const activeImage = state.get('list').find(img => img.get('_id') === payload);
      return state.set(
        'activeImage',
        activeImage
      );
    case UPDATE_IMAGE_SUCCESS:
      const oldImages = state.get('list');
      const updatedImages = oldImages
        .set(
          oldImages.findIndex(item => item.get('_id') === payload._id),
          fromJS(payload)
        );
      return state.merge({
        list: updatedImages
      });
    case FETCH_IMAGES_SUCCESS:
      const newImages = state.get('list')
        .concat(fromJS(payload))
        .groupBy(img => img.get('_id'))
        .map(item => item.first())
        .toList();
      return state.merge({
        list: newImages,
        loading: false
      });
    default:
      return state;
  }
}