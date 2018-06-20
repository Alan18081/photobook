import {call,put} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAlbumsSuccess,
  setError,
  fetchAlbumsStart
} from '../../actions';

export function* fetchAlbums(id) {
  try {
    yield put(fetchAlbumsStart());
    const {data} = yield call(axios.get,`/api/albums/users/${id}`);
    yield put(fetchAlbumsSuccess(data));
  }
  catch (error) {
    yield put(setError());
  }
}