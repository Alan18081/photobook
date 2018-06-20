import {call,takeLatest,put} from 'redux-saga/effects';
import axios from 'axios';
import {
  LIKE_IMAGE
} from '../../actions/types';
import {
  setError,
  updateImageSuccess
} from '../../actions/index';

export function* likeImageSaga() {
  yield takeLatest(LIKE_IMAGE,function* ({payload}) {
    try {
      const {data} = yield call(axios.put,`/api/images/${payload}/like`);
      yield put(updateImageSuccess(data));
    }
    catch(error) {
      console.log(error);
      yield put(setError());
    }
  })
}