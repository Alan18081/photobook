import {
  SET_SEARCH_QUERY,
} from '../actions/types';

const initialState = '';

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case SET_SEARCH_QUERY:
      return payload || 'all';
    default:
      return state;
  }
};