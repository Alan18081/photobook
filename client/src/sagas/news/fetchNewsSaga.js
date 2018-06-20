import {call,takeLatest,put} from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_NEWS
} from '../../actions/types';
import {
  fetchNewsSuccess,
  fetchImagesSuccess,
  setError
} from '../../actions/index';

export function* fetchNewsSaga() {
  yield takeLatest(FETCH_NEWS, function* ({payload}) {
    try {
      const {data} = yield call(axios.get,`/api/images/news/offset/${payload}`);
      console.log(data);
      const newsIds = data.images.map(({_id}) => _id);
      data.images.reverse();
      yield put(fetchImagesSuccess(data.images));
      yield put(fetchNewsSuccess(newsIds,data.size));
    }
    catch(error) {
      console.log(error);
      yield put(setError());
    }
  });
}