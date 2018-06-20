import {call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  RESET_PASSWORD
} from '../../actions/types';
import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailed,
  setError
} from '../../actions/index';

export function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD,function* ({payload}) {
    try {
      yield put(resetPasswordStart());
      const {data} = yield call(axios.post,`/api/resetPassword`,payload);
      yield put(data.error ? resetPasswordFailed(data) : resetPasswordSuccess(payload.email));
    }
    catch (error) {
      yield put(setError());
    }
  })
}