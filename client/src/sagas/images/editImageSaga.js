import {takeLatest,put,call} from 'redux-saga/effects';
import axios from 'axios';
import {
  EDIT_IMAGE
} from '../../actions/types';
import {
  setError,
  updateImageSuccess
} from '../../actions/index';

export function* editImageSaga() {
  yield takeLatest(EDIT_IMAGE,function* ({payload: {id,info}}) {
    try {
      const {data} = yield call(axios.put,`/api/images/${id}`,info);
      yield put(updateImageSuccess(data));
    }
    catch (error) {
      yield put(setError());
    }
  });
}