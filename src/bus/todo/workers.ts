// Core
import { put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

// Actions
import { TodoActions } from './actions';

export function* createList(action: any) {
  const list = { id: uuid(), title: action.payload, items: [] }
  yield put(TodoActions.createList(list));
}

export function* removeList(action: any) {
  const id = action.payload;
  const itemIds = yield select((state) => state.todo.lists.byId[id].items);

  yield put(TodoActions.removeItems([...itemIds]));
  yield put(TodoActions.removeList(id));
}

export function* createItem(action: any) {
  const { listId, title } = action.payload;
  const item = { id: uuid(), title };

  yield put(TodoActions.createItem(item));
  yield put(TodoActions.createItemToList(listId, item.id))
}

export function* removeItem(action: any) {
  const { listId, id } = action.payload;

  yield put(TodoActions.removeItem(id));
  yield put(TodoActions.removeItemFromList(listId, id))
}
