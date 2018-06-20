import {fromJS} from 'immutable';
import {
  FETCH_NEWS_SUCCESS,
  DELETE_NEWS,
  ADD_NEWS
} from '../actions/types';

const initialState = fromJS({
  list: fromJS([]),
  size: 0
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case DELETE_NEWS:
      return state.set(
        'list',
        state.get('list').filter(id => id !== payload)
      );
    case FETCH_NEWS_SUCCESS:
      return state.merge({
        list: state.get('list').concat(fromJS(payload.news)),
        size: payload.size
      });
    case ADD_NEWS:
      return state.set(
        'list',
        state.get('list').push(fromJS(payload))
      );
    default:
      return state;
  }
};