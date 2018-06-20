import {call,put,takeLatest} from 'redux-saga/effects';
import {
  loginSuccess,
  loginFailed,
  loginStart,
  setError
} from '../../actions/index';
import {
  LOGIN,
} from '../../actions/types';
import axios from 'axios';

export function* loginSaga() {
  yield takeLatest(LOGIN, function* ({payload}) {
    try {
      yield put(loginStart());
      const response = yield call(axios.post,`/api/login`,payload);
      const {data} = response;
      if(data.errors) {
        yield put(loginFailed(data.errors));
      }
      else {
        yield put(loginSuccess(data));
      }
    }
    catch(error) {
      yield put(setError());
    }
  });
}