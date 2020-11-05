// Types
import { TodoTypes } from './types';

export type Item = {
  id: string,
  title: string,
};

export type List = {
  id: string,
  title: string,
  items: string[],
};

type createList = {
  type: typeof TodoTypes.CREATE_LIST,
  payload: List,
};

type updateList = {
  type: typeof TodoTypes.UPDATE_LIST,
  payload: List,
};

type removeList = {
  type: typeof TodoTypes.REMOVE_LIST,
  payload: string,
};

type createItemToList = {
  type: typeof TodoTypes.CREATE_ITEM_TO_LIST,
  payload: { listId: string, id: string },
};

type removeItemFromList = {
  type: typeof TodoTypes.REMOVE_ITEM_FROM_LIST,
  payload: { listId: string, id: string },
};

type createItem = {
  type: typeof TodoTypes.CREATE_ITEM,
  payload: Item,
};

type updateItem = {
  type: typeof TodoTypes.UPDATE_ITEM,
  payload: Item,
};

type removeItem = {
  type: typeof TodoTypes.REMOVE_ITEM,
  payload: string,
};

type removeItems = {
  type: typeof TodoTypes.REMOVE_ITEMS,
  payload: string[],
};

export type Action =
  | createList
  | updateList
  | removeList
  | createItemToList
  | removeItemFromList
  | createItem
  | updateItem
  | removeItem
  | removeItems;

export const TodoActions = {
  // Sync
  createList: (list: List) => ({
    type: TodoTypes.CREATE_LIST,
    payload: list,
  }),

  updateList: (list: List) => ({
    type: TodoTypes.UPDATE_LIST,
    payload: list,
  }),

  removeList: (id: string) => ({
    type: TodoTypes.REMOVE_LIST,
    payload: id,
  }),

  createItemToList: (listId: string, id: string) => ({
    type: TodoTypes.CREATE_ITEM_TO_LIST,
    payload: { listId, id },
  }),

  removeItemFromList: (listId: string, id: string) => ({
    type: TodoTypes.REMOVE_ITEM_FROM_LIST,
    payload: { listId, id },
  }),

  createItem: (item: Item) => ({
    type: TodoTypes.CREATE_ITEM,
    payload: item,
  }),

  updateItem: (item: Item) => ({
    type: TodoTypes.UPDATE_ITEM,
    payload: item,
  }),

  removeItem: (id: string) => ({
    type: TodoTypes.REMOVE_ITEM,
    payload: id,
  }),

  removeItems: (ids: string[]) => ({
    type: TodoTypes.REMOVE_ITEMS,
    payload: ids,
  }),

  // Async
  createListAsync: (title: string) => ({
    type: TodoTypes.CREATE_LIST_ASYNC,
    payload: title,
  }),

  removeListAsync: (id: string) => ({
    type: TodoTypes.REMOVE_LIST_ASYNC,
    payload: id,
  }),

  createItemAsync: (listId: string, title: string) => ({
    type: TodoTypes.CREATE_ITEM_ASYNC,
    payload: { listId, title },
  }),

  removeItemAsync: (listId: string, id: string) => ({
    type: TodoTypes.REMOVE_ITEM_ASYNC,
    payload: { listId, id },
  }),
};
