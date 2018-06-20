import {
  UPDATE_IMAGE_SUCCESS,
  LOAD_IMAGES,
  EDIT_IMAGE,
  GET_ACTIVE_IMAGE,
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGES_BY_ALBUM_ID,
  LIKE_IMAGE,
  ADD_COMMENT,
  FETCH_IMAGES_BY_ALBUM_ID,
  FETCH_IMAGES_START,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGES_SUCCESS
} from './types';

export const deleteImagesByAlbumId = (id) => ({
  type: DELETE_IMAGES_BY_ALBUM_ID,
  payload: id
});

export const fetchImagesByAlbumId = (albumId) => ({
  type: FETCH_IMAGES_BY_ALBUM_ID
});

export const fetchImagesStart = () => ({
  type: FETCH_IMAGES_START
});

export const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: images
});

export const fetchImageSuccess = (image) => ({
  type: FETCH_IMAGE_SUCCESS,
  payload: image
});

export const addComment = (id,comment) => ({
  type: ADD_COMMENT,
  payload: {
    id,
    comment
  }
});

export const updateImageSuccess = (image) => ({
  type: UPDATE_IMAGE_SUCCESS,
  payload: image
});

export const deleteImage = (albumId,imageId) => ({
  type: DELETE_IMAGE,
  payload: {
    albumId,
    imageId
  }
});

export const deleteImageSuccess = (id) => ({
  type: DELETE_IMAGE_SUCCESS,
  payload: id
});

export const getActiveImage = (id) => ({
  type: GET_ACTIVE_IMAGE,
  payload: id
});

export const loadImages = (id,files,cb) => ({
  type: LOAD_IMAGES,
  payload: {
    id,
    files,
    cb
  }
});

export const editImage = (id,info) => ({
  type: EDIT_IMAGE,
  payload: {
    id,
    info
  }
});

export const likeImage = (id) => ({
  type: LIKE_IMAGE,
  payload: id
});