import {call,put,takeLatest,select} from 'redux-saga/effects';
import axios from 'axios';
import {getActiveAlbum} from '../../selectors';
import {
  DELETE_ALBUM
} from '../../actions/types';
import {
  deleteAlbumSuccess,
  deleteImagesByAlbumId,
  deleteNews,
  setError
} from '../../actions/index';

export function* deleteAlbumSaga() {
  yield takeLatest(DELETE_ALBUM,function* ({payload}) {
    try {
      const album = yield select(getActiveAlbum);
      const images = album.get('images');
      yield call(axios.delete,`/api/albums/${payload}`);
      yield put(deleteAlbumSuccess(payload));
      yield put(deleteImagesByAlbumId(payload));
      for(let id of images) {
        yield put(deleteNews(id));
      }
    }
    catch(error) {
      yield put(setError());
    }
  });
}