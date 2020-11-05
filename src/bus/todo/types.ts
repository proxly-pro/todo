export const TodoTypes = {
  // Sync
  CREATE_LIST: 'CREATE_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  REMOVE_LIST: 'REMOVE_LIST',
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
