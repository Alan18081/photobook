import {call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import createFormData from 'object-to-formdata';
import {
  LOAD_IMAGES
} from '../../actions/types';
import {
  setError,
  fetchImagesSuccess,
  addAlbumIds
} from '../../actions';

export function* loadImagesSaga() {
  yield takeLatest(LOAD_IMAGES,function*({payload}){
    try {
      const formData = createFormData(payload.files);
      const {data} = yield call(axios.post,`/api/images/addImages/${payload.id}`,formData);
      yield put(fetchImagesSuccess(data));
      const imageIds = data.map(img => img._id);
      yield call(payload.cb);
      yield put(addAlbumIds(payload.id,imageIds));
    }
    catch(error) {
      console.log(error);
      yield put(setError());
    }
  });
}