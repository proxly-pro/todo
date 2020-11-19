// Types
import { TodoTypes, List, Item } from './types';

export const TodoActions = {
  // Sync
  createList: (list: List) => ({
    type: TodoTypes.CREATE_LIST,
    payload: list,
  }),

  updateList: (id: string, title: string) => ({
    type: TodoTypes.UPDATE_LIST,
    payload: { id, title },
  }),

  removeList: (id: string) => ({
    type: TodoTypes.REMOVE_LIST,
    payload: id,
  }),

  reorderItemInList: (id: string, startIndex: number, endIndex: number) => ({
    type: TodoTypes.REORDER_ITEM_IN_LIST,
    payload: { id, startIndex, endIndex },
  }),

  moveItemFromList: (
    sourceId: string,
    destinationId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => ({
    type: TodoTypes.MOVE_ITEM_FROM_LIST,
    payload: { sourceId, destinationId, sourceIndex, destinationIndex },
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

  updateItem: (id: string, title: string) => ({
    type: TodoTypes.UPDATE_ITEM,
    payload: { id, title },
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
