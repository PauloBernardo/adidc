import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/user';
import appReducer from './reducers/app';

import rootSaga from './saga/root';

const reducers = combineReducers({
  user: userReducer,
  app: appReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
