import {call,put,select} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchImagesStart,
  fetchImagesSuccess
} from '../../actions/index';

export function* fetchImages(id) {
  yield put(fetchImagesStart());
  const offset = yield select(state => state.albums.get('offset'));
  const {data} = yield call(axios.get,`/api/images/${id}/${offset}`);
  yield put(fetchImagesSuccess(data));
}