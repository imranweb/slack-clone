import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeLatest} from 'redux-saga/effects'; 
import Reducers from './reducers';
import {createUser, connect} from './saga';
import App from './App'
import './index.css'

function* watchRequest() {
  yield takeLatest('CREATE_USER', createUser);
  yield takeLatest('CONNECT', connect);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));

store.subscribe(() => {
  //console.log("State from Subscriber", store.getState());
})
sagaMiddleware.run(watchRequest);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));