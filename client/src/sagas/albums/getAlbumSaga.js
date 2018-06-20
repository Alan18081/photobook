import {call,select,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {fetchImages} from '../images/fetchImages';
import {getAlbumById} from '../../selectors/index';
import {
  GET_ALBUM
} from '../../actions/types';
import {
  getAlbumSuccess,
  resetAlbumOffset,
  setError
} from '../../actions/index';

export function* getAlbumSaga() {
  yield takeLatest(GET_ALBUM, function*({payload: {id}}) {
    try {
      const album = yield select(getAlbumById, id);
      if (album) {
        yield put(getAlbumSuccess(album));
        yield call(fetchImages, album.get('_id'));
      }
      else {
        const {data} = yield call(axios.get, `/api/albums/${id}`);
        yield put(getAlbumSuccess(data));
        yield call(fetchImages, data._id);
      }
      yield put(resetAlbumOffset());
    }
    catch (error) {
      console.log(error);
      yield put(setError());
    }
  });
}