import {put,call,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    DELETE_IMAGE
} from '../../actions/types';
import {
  updateAlbumSuccess,
  deleteImageSuccess,
  setError
} from '../../actions';

export function* deleteImageSaga() {
  yield takeLatest(DELETE_IMAGE,function* ({payload:{imageId,albumId}}) {
    try {
      const {data} = yield call(axios.delete,`/api/images/${imageId}/album/${albumId}`);
      yield put(deleteImageSuccess(imageId));
      yield put(updateAlbumSuccess(data));
    }
    catch(error) {
      console.log(error);
      yield put(setError());
    }
  });
}