import {call,put,take} from 'redux-saga/effects';
import axios from 'axios';
import {fetchAlbums} from '../albums/fetchAlbums';
import {
  FETCH_USER
} from '../../actions/types';
import {fetchUserSuccess,setError} from '../../actions/index';


export function* fetchUserSaga() {
  try {
    const {payload} = yield take(FETCH_USER);
    const {data} = yield call(axios.get,`/api/users/${payload}`);
    yield call(fetchAlbums,data._id);
    yield put(fetchUserSuccess(data));
  }
  catch(error) {
    yield put(setError());
  }
}