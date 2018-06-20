import {combineReducers} from 'redux';
import auth from './auth';
import images from './images';
import albums from './albums';
import error from './error';
import users from './users';
import news from './news';
import search from './search';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  auth,
  albums,
  error,
  users,
  news,
  search,
  images,
  form
});

export default rootReducer;