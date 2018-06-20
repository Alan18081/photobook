import {fromJS} from 'immutable';

import {
  SET_ERROR
} from '../actions/types';

const initialState = fromJS({
  error: null
});

export default (state = initialState,{type}) => {
  switch(type) {
    case SET_ERROR:
      return state.set('error','Ошибка на сервере. Попробуйте позже');
    default:
      return state;
  }
};