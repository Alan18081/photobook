import {put,takeLatest,call,select} from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SEARCH_RESULTS
} from '../../actions/types';
import {
  fetchSearchResultsStart,
  fetchImagesSuccess,
  setError
} from '../../actions/index';

export function* fetchSearchResultsSaga() {
  yield takeLatest(FETCH_SEARCH_RESULTS,function* (){
    try {
      const query = yield select(state => state.search);
      yield put(fetchSearchResultsStart());
      const {data} = yield call(axios.get,`/api/images/search/${query}`);
      yield put(fetchImagesSuccess(data));
    }
    catch(error) {
      yield put(setError());
    }
  });
}