import {takeLatest,put,call} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMENT
} from '../../actions/types';
import {
  updateImageSuccess,
  setError
} from '../../actions/index';

export function* addCommentSaga() {
  yield takeLatest(ADD_COMMENT,function* ({payload: {id,comment}}) {
    try {
      const {data} = yield call(axios.post,`/api/images/${id}/addComment`,comment);
      yield put(updateImageSuccess(data));
    }
    catch(error) {
      yield put(setError());
    }
  })
}