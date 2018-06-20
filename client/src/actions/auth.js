import {
  FETCH_AUTH_USER,
  FETCH_AUTH_USER_SUCCESS,
  FETCH_AUTH_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_START,
  REGISTER,
  LOGIN,
  LOGIN_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_START,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED
} from './types';

export const setNewPassword = (password,token) => ({
  type: SET_NEW_PASSWORD,
  payload: {
    password,
    token
  }
});

export const setNewPasswordStart = () => ({
  type: SET_NEW_PASSWORD_START
});

export const setNewPasswordSuccess = () => ({
  type: SET_NEW_PASSWORD_SUCCESS
});

export const setNewPasswordFailed = (error) => ({
  type: SET_NEW_PASSWORD_FAILED,
  payload: error
});

export const resetPassword = (email) => ({
  type: RESET_PASSWORD,
  payload: email
});

export const resetPasswordStart = () => ({
  type: RESET_PASSWORD_START
});

export const resetPasswordSuccess = (email) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: email
});

export const resetPasswordFailed = (error) => ({
  type: RESET_PASSWORD_FAILED,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const fetchAuthUser = () => ({
  type: FETCH_AUTH_USER
});

export const fetchAuthUserSuccess = (user) => ({
  type: FETCH_AUTH_USER_SUCCESS,
  payload: user
});

export const fetchAuthUserFailed = () => ({
  type: FETCH_AUTH_USER_FAILED
});

export const login = (userInfo) => ({
  type: LOGIN,
  payload: userInfo
});

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
  error: true
});

export const register = (userInfo) => ({
  type: REGISTER,
  payload: userInfo
});

export const registerStart = () => ({
  type: REGISTER_START
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: error,
  error: true
});