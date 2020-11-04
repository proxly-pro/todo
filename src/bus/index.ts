// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { all, call } from 'redux-saga/effects';

// Reducers
import { todo } from './todo/reducer';

export const rootReducer = (history: History) =>
  combineReducers({ todo, router: connectRouter(history) });

export type State = any;

export function* rootSaga() {
  yield all([]);
}
