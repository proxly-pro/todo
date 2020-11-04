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

type createItem = {
  type: typeof TodoTypes.CREATE_ITEM,
  payload: { parentId: string, item: Item },
};

type updateItem = {
  type: typeof TodoTypes.UPDATE_ITEM,
  payload: Item,
};

type removeItem = {
  type: typeof TodoTypes.REMOVE_ITEM,
  payload: { parentId: string, id: string },
};

type searchItem = {
  type: typeof TodoTypes.SEARCH_ITEM,
  payload: string,
};

export type Action =
  | createList
  | updateList
  | removeList
  | createItem
  | updateItem
  | removeItem
  | searchItem;

export const TodoActions = {
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

  createItem: (parentId: string, item: Item) => ({
    type: TodoTypes.CREATE_ITEM,
    payload: { parentId, item },
  }),

  updateItem: (item: Item) => ({
    type: TodoTypes.UPDATE_ITEM,
    payload: item,
  }),

  removeItem: (parentId: string, id: string) => ({
    type: TodoTypes.REMOVE_ITEM,
    payload: { parentId, id },
  }),

  searchItem: (value: string) => ({
    type: TodoTypes.SEARCH_ITEM,
    payload: value,
  }),
};
