import {takeLatest,put,call} from 'redux-saga/effects';
import axios from 'axios';

import {LOGOUT} from '../../actions/types';
import {logoutSuccess,setError} from '../../actions';

export function* logoutSaga() {
  yield takeLatest(LOGOUT,function* () {
    try {
      yield call(axios.get,'/api/logout');
      yield put(logoutSuccess());
    }
    catch(error) {
      yield put(setError());
    }
  });
}