// Core
import { put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

// Actions
import { TodoActions } from './actions';

// Types
import {
  createListAsync,
  removeListAsync,
  createItemAsync,
  removeItemAsync,
} from './types';

export function* createList(action: createListAsync) {
  const list = { id: uuid(), title: action.payload, items: [] };
  yield put(TodoActions.createList(list));
}

export function* removeList(action: removeListAsync) {
  const id = action.payload;
  const itemIds = yield select((state) => state.todo.lists.byId[id].items);

  yield put(TodoActions.removeItems([...itemIds]));
  yield put(TodoActions.removeList(id));
}

export function* createItem(action: createItemAsync) {
  const { listId, title } = action.payload;
  const item = { id: uuid(), title };

  yield put(TodoActions.createItem(item));
  yield put(TodoActions.createItemToList(listId, item.id));
}

export function* removeItem(action: removeItemAsync) {
  const { listId, id } = action.payload;

  yield put(TodoActions.removeItem(id));
  yield put(TodoActions.removeItemFromList(listId, id));
}
