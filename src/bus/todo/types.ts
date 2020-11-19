export const TodoTypes = {
  // Sync
  CREATE_LIST: 'CREATE_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  REMOVE_LIST: 'REMOVE_LIST',
  REORDER_ITEM_IN_LIST: 'REORDER_ITEM_IN_LIST',
  MOVE_ITEM_FROM_LIST: 'MOVE_ITEM_FROM_LIST',
  CREATE_ITEM_TO_LIST: 'CREATE_ITEM_TO_LIST',
  REMOVE_ITEM_FROM_LIST: 'REMOVE_ITEM_FROM_LIST',

  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  REMOVE_ITEMS: 'REMOVE_ITEMS',

  // Async
  CREATE_LIST_ASYNC: 'CREATE_LIST_ASYNC',
  REMOVE_LIST_ASYNC: 'REMOVE_LIST_ASYNC',
  CREATE_ITEM_ASYNC: 'CREATE_ITEM_ASYNC',
  REMOVE_ITEM_ASYNC: 'REMOVE_ITEM_ASYNC',
} as const;

export interface Item {
  id: string;
  title: string;
}

export interface List {
  id: string;
  title: string;
  items: string[];
}

export interface ListsState {
  byId: { [id: string]: List };
  allIds: string[];
}

export interface ItemsState {
  byId: { [id: string]: Item };
}

interface createList {
  type: typeof TodoTypes.CREATE_LIST;
  payload: List;
}

interface updateList {
  type: typeof TodoTypes.UPDATE_LIST;
  payload: { id: string; title: string };
}

interface removeList {
  type: typeof TodoTypes.REMOVE_LIST;
  payload: string;
}

interface reorderItemInList {
  type: typeof TodoTypes.REORDER_ITEM_IN_LIST;
  payload: { id: string; startIndex: number; endIndex: number };
}

interface moveItemFromList {
  type: typeof TodoTypes.MOVE_ITEM_FROM_LIST;
  payload: {
    sourceId: string;
    destinationId: string;
    sourceIndex: number;
    destinationIndex: number;
  };
}

interface createItemToList {
  type: typeof TodoTypes.CREATE_ITEM_TO_LIST;
  payload: { listId: string; id: string };
}

interface removeItemFromList {
  type: typeof TodoTypes.REMOVE_ITEM_FROM_LIST;
  payload: { listId: string; id: string };
}

interface createItem {
  type: typeof TodoTypes.CREATE_ITEM;
  payload: Item;
}

interface updateItem {
  type: typeof TodoTypes.UPDATE_ITEM;
  payload: { id: string; title: string };
}

interface removeItem {
  type: typeof TodoTypes.REMOVE_ITEM;
  payload: string;
}

interface removeItems {
  type: typeof TodoTypes.REMOVE_ITEMS;
  payload: string[];
}

export interface createListAsync {
  type: typeof TodoTypes.CREATE_LIST_ASYNC,
  payload: string,
}

export interface removeListAsync {
  type: typeof TodoTypes.REMOVE_LIST_ASYNC,
  payload: string,
}

export interface createItemAsync {
  type: typeof TodoTypes.CREATE_ITEM_ASYNC,
  payload: { listId: string, title: string },
}

export interface removeItemAsync {
  type: typeof TodoTypes.REMOVE_ITEM_ASYNC,
  payload: { listId: string, id: string },
}

export type ListActionTypes =
  | createList
  | updateList
  | removeList
  | reorderItemInList
  | moveItemFromList
  | createItemToList
  | removeItemFromList;

export type ItemActionTypes =
  | createItem
  | updateItem
  | removeItem
  | removeItems;
