import {call,put,takeLatest,select} from 'redux-saga/effects';
import axios from 'axios';
import {getActiveAlbum} from '../../selectors';
import {
  FETCH_IMAGES_BY_ALBUM_ID
} from '../../actions/types';
import {
  fetchImagesSuccess,
  setError
} from '../../actions';

export function* loadMoreImagesSaga() {
  yield takeLatest(FETCH_IMAGES_BY_ALBUM_ID,function* () {
    try {
      const offset = yield select(state => state.albums.get('offset'));
      const album = yield select(getActiveAlbum);
      const {data} = yield call(axios.get,`/api/images/${album.get('_id')}/${offset}`);
      console.log(data);
      yield put(fetchImagesSuccess(data));
    }
    catch (error) {
      yield put(setError());
    }
  })
}