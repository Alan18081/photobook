import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FIND_USER_ALBUM,
  GET_USER_ALBUM_SUCCESS,
  RESET_USER_SEARCH
} from './types';

export const resetUserSearch = () => ({
  type: RESET_USER_SEARCH
});

export const findUserAlbum = (query) => ({
  type: FIND_USER_ALBUM,
  payload: query
});

export const fetchUser = (id) => ({
  type: FETCH_USER,
  payload: id
});

export const fetchUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data
});

export const getUserAlbumSuccess = (album) => ({
  type: GET_USER_ALBUM_SUCCESS,
  payload: album
});