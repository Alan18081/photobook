import {fromJS} from 'immutable';
import {
  FETCH_USER_SUCCESS
} from '../actions/types';

const initialState = fromJS({});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return fromJS(payload);
    default:
      return state;
  }
}