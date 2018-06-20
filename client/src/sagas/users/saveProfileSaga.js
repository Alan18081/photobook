import {takeLatest,put,call} from 'redux-saga/effects';
import createFormData from 'object-to-formdata';
import axios from 'axios';
import { SAVE_PROFILE } from '../../actions/types';
import {fetchAuthUserSuccess,setError} from '../../actions/index';

export function* saveProfileSaga() {
  yield takeLatest(SAVE_PROFILE,function* ({payload}) {
    try {
      const formInfo = createFormData(payload);
      const {data} = yield call(axios.post,'/api/saveProfile',formInfo);
      yield put(fetchAuthUserSuccess(data));
    }
    catch(error) {
      yield put(setError());
    }
  })
}