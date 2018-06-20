import {call,put,takeLatest} from 'redux-saga/effects';
import createFormData from 'object-to-formdata';
import axios from 'axios';
import {
  CREATE_ALBUM
} from '../../actions/types';
import {
  createAlbumSuccess,
  fetchImageSuccess,
  setError
} from '../../actions';


export function* createAlbumSaga() {
  yield takeLatest(CREATE_ALBUM,function* ({payload}) {
    try {
      const formInfo = createFormData(payload);
      const {data} = yield call(axios.post,'/api/albums',formInfo);
      yield put(createAlbumSuccess(data.album));
      yield put(fetchImageSuccess(data.image));
    }
    catch(error) {
      yield put(setError());
    }
  })
}