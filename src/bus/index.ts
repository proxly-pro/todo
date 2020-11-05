// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { all, call } from 'redux-saga/effects';

// Reducers
import { todo } from './todo/reducer';

// Watchers
import { watchTodo } from './todo/watchers'

export type State = any;

export const rootReducer = (history: History) =>
  combineReducers({ todo, router: connectRouter(history) });

export function* rootSaga() {
  yield all([call(watchTodo)]);
}
