import {call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import createFormData from 'object-to-formdata';
import {
  EDIT_ALBUM
} from '../../actions/types';
import {
  updateAlbumSuccess,
  setError
} from '../../actions';

export function* editAlbumSaga() {
  yield takeLatest(EDIT_ALBUM,function* ({payload : {id,albumInfo}}) {
    try {
      const formInfo = createFormData(albumInfo);
      const {data} = yield call(axios.put,`/api/albums/${id}`,formInfo);
      yield put(updateAlbumSuccess(data));
    }
    catch(error) {
      yield put(setError());
    }
  })
}