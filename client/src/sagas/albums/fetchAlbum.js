import {call,put,fork,all} from 'redux-saga/effects';
import axios from 'axios';
// import {fetchImage} from './fetchImage';
import {
  fetchAlbumSuccess,
  fetchImagesSuccess
} from '../../actions/index';

export function* fetchAlbum(id) {
  const albumResponse = yield call(axios.get,`/api/albums/${id}`);
  const album = albumResponse.data;
  const imagesResponse = yield call(axios.get,`/api/images/${album._id}`);
  const images = imagesResponse.data;
  yield put(fetchImagesSuccess(images));
  yield put(fetchAlbumSuccess(album));
}