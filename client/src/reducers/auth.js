import { fromJS } from 'immutable';
import {
  FETCH_AUTH_USER_SUCCESS,
  FETCH_AUTH_USER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_START,
  LOGOUT_SUCCESS,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_NEW_PASSWORD_START,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED
} from '../actions/types';

const initialState = fromJS({
  user: null,
  loading: false,
  resetPasswordNotification: false,
  setNewPasswordError: null,
  isNewPasswordSet: false,
  loginErrors: [],
  registerErrors: []
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case SET_NEW_PASSWORD_START:
      return state.merge({
        loading: true,
        isNewPasswordSet: false
      });
    case SET_NEW_PASSWORD_FAILED:
      return state.set('setNewPasswordError',payload);
    case SET_NEW_PASSWORD_SUCCESS:
      return state.merge({
        loading: false,
        isNewPasswordSet: true
      });
    case RESET_PASSWORD_START:
      return state.merge({
        loading: true,
        resetPasswordNotification: null
      });
    case RESET_PASSWORD_FAILED:
      return state.merge({
        loading: false,
        resetPasswordNotification: payload
      });
    case RESET_PASSWORD_SUCCESS:
      return state.merge({
        loading: false,
        resetPasswordNotification: `Ссылка на смену пароля отправлена на почту ${payload}`
      });
    case FETCH_AUTH_USER_SUCCESS:
      return state.set('user', fromJS(payload));
    case FETCH_AUTH_USER_FAILED:
      return state.set('user',false);
    case REGISTER_START:
      return state.merge({
        loading:true,
        registerErrors:[]
      });
    case REGISTER_SUCCESS:
      return state.merge({
        user: fromJS(payload),
        loading: false
      });
    case REGISTER_FAILED:
      return state.merge({
        registerErrors: fromJS(payload),
        loading: false
      });
    case LOGIN_START:
      return state.merge({
        loading: true,
        loginErrors: []
      });
    case LOGIN_SUCCESS:
      return state.merge({
        user: fromJS(payload),
        loading: false
      });
    case LOGIN_FAILED:
      return state.merge({
        loginErrors : fromJS(payload),
        loading: false
      });
    case LOGOUT_SUCCESS:
      return fromJS({
        user: false,
        loading: false,
        resetPasswordNotification: false,
        setNewPasswordError: null,
        isNewPasswordSet: false,
        loginErrors: [],
        registerErrors: []
      });
    default:
      return state;
  }
}