import {call,put,takeLatest} from 'redux-saga/effects';
import {
  registerStart,
  registerSuccess,
  registerFailed,
  setError
} from '../../actions/index';
import {
  REGISTER
} from '../../actions/types';
import axios from 'axios';

export function* registerSaga() {
  yield takeLatest(REGISTER,function* ({payload}) {
    try {
      yield put(registerStart());
      const response = yield call(axios.post,'/api/register',payload);
      const {data} = response;
      if(data.errors) {
        yield put(registerFailed(data.errors));
      }
      else {
        yield put(registerSuccess(data));
      }
    }
    catch (error) {
      yield put(setError());
    }
  });

}