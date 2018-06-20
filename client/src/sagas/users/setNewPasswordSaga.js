import {call,takeLatest,put} from 'redux-saga/effects';
import axios from 'axios';
import {
  SET_NEW_PASSWORD
} from '../../actions/types';
import {
  setError,
  setNewPasswordSuccess,
  setNewPasswordStart,
  setNewPasswordFailed
} from '../../actions/index';

export function* setNewPasswordSaga() {
  yield takeLatest(SET_NEW_PASSWORD,function* ({payload}) {
    try {
      yield put(setNewPasswordStart());
      const {data} = yield call(axios.post,`/api/setNewPassword`,payload);
      yield put(data.error ? setNewPasswordFailed(data.error) : setNewPasswordSuccess())
    }
    catch (error) {
      yield put(setError());
    }
  })
}