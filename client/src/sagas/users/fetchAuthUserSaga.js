import {put,take,call} from 'redux-saga/effects';
import axios from 'axios';
import {fetchAlbums} from '../albums/fetchAlbums';
import {
  FETCH_AUTH_USER
} from '../../actions/types';
import {
  fetchAuthUserSuccess,
  setError
} from '../../actions/index';

export function* fetchAuthUserSaga() {
  try {
    yield take(FETCH_AUTH_USER);
    const {data} = yield call(axios.get,'/api/current_user');
    yield put(fetchAuthUserSuccess(data));
    if(data) {
      yield call(fetchAlbums,data._id);
    }
  }
  catch(error) {
    yield put(setError());
  }
}