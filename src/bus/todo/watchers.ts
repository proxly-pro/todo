// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { TodoTypes } from './types';

// Workers
import { createList, removeList, createItem, removeItem } from './workers';

export function* watchCreateList() {
  yield takeEvery(TodoTypes.CREATE_LIST_ASYNC, createList);
}

export function* watchRemoveList() {
  yield takeEvery(TodoTypes.REMOVE_LIST_ASYNC, removeList);
}

export function* watchCreateItem() {
  yield takeEvery(TodoTypes.CREATE_ITEM_ASYNC, createItem);
}

export function* watchRemoveItem() {
  yield takeEvery(TodoTypes.REMOVE_ITEM_ASYNC, removeItem);
}

export function* watchTodo() {
  yield all([
    call(watchCreateList),
    call(watchRemoveList),
    call(watchCreateItem),
    call(watchRemoveItem),
  ]);
}
