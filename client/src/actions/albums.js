import {
  INC_ALBUM_OFFSET,
  RESET_ALBUM_OFFSET,
  ADD_ALBUM_IDS,
  CREATE_ALBUM,
  CREATE_ALBUM_SUCCESS,
  FETCH_ALBUMS,
  UPDATE_ALBUM_SUCCESS,
  FETCH_ALBUMS_START,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILED,
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_AUTH_ALBUM_SUCCESS,
  GET_AUTH_ALBUM_FAILED,
  EDIT_ALBUM,
  EDIT_ALBUM_SUCCESS,
  DELETE_ALBUM,
  DELETE_ALBUM_SUCCESS,
  FETCH_ALBUM_SUCCESS
} from './types';

export const incAlbumOffset = () => ({
  type: INC_ALBUM_OFFSET
});

export const resetAlbumOffset = () => ({
  type: RESET_ALBUM_OFFSET
});

export const addAlbumIds = (albumId,ids) => ({
  type: ADD_ALBUM_IDS,
  payload: {
    ids,
    albumId
  }
});

export const fetchAlbumSuccess = (album) => ({
  type: FETCH_ALBUM_SUCCESS,
  payload: album
});

export const updateAlbumSuccess = (album) => ({
  type: UPDATE_ALBUM_SUCCESS,
  payload: album
});

export const deleteAlbum = (id) => ({
  type: DELETE_ALBUM,
  payload: id
});

export const deleteAlbumSuccess = (id) => ({
  type: DELETE_ALBUM_SUCCESS,
  payload: id
});

export const editAlbum = (id,albumInfo) => ({
  type: EDIT_ALBUM,
  payload: {
    id,
    albumInfo
  }
});

export const editAlbumSuccess = (id,albumInfo) => ({
  type: EDIT_ALBUM_SUCCESS,
  payload: {
    id,
    albumInfo
  }
});

export const getAlbum = (id,userAlbum) => ({
  type: GET_ALBUM,
  payload: {
    id,
    userAlbum
  }
});

export const getAlbumSuccess = (album) => ({
  type: GET_ALBUM_SUCCESS,
  payload: album
});

export const getAuthAlbumSuccess = (album) => ({
  type: GET_AUTH_ALBUM_SUCCESS,
  payload: album
});

export const getAuthAlbumFailed = (error) => ({
  type: GET_AUTH_ALBUM_FAILED,
  payload: error
});

export const createAlbum = (albumInfo) => ({
  type: CREATE_ALBUM,
  payload: albumInfo
});

export const createAlbumSuccess = (album) => ({
  type: CREATE_ALBUM_SUCCESS,
  payload: album
});

export const fetchAlbums = (id) => ({
  type: FETCH_ALBUMS,
  payload: id
});

export const fetchAlbumsStart = () => ({
  type: FETCH_ALBUMS_START
});

export const fetchAlbumsSuccess = (albums) => ({
  type: FETCH_ALBUMS_SUCCESS,
  payload: albums
});

export const fetchAlbumsFailed = (error) => ({
  type: FETCH_ALBUMS_FAILED,
  payload: error
});

