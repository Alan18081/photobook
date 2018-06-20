import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(rootReducer,composeWithDevTools(
  applyMiddleware(...middleware)
));

Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));

export default store;