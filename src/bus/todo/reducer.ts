// Core
import produce from 'immer';
import { combineReducers } from 'redux';

// Types
import { TodoTypes } from './types';

import { Action, List, Item } from './actions';

const create = (draft: ISLists | ISItems, entity: List | Item) => {
  draft.byId[entity.id] = entity;
  draft.allIds.push(entity.id);
};

const update = (draft: ISLists | ISItems, entity: List | Item) => {
  draft.byId[entity.id] = entity;
};

const remove = (draft: ISLists | ISItems, id: string) => {
  const index = draft.allIds.findIndex((i: string) => i === id);
  delete draft.byId[id];
  draft.allIds.splice(index, 1);
};

type ISItems = {
  byId: { [id: string]: { id: string, title: string } },
  allIds: string[],
};

const ISItems = { byId: {}, allIds: [] };

const items = (
  state: ISItems = ISItems,
  action: Action
) => produce(state, (draft) => {
  switch (action.type) {
    case TodoTypes.CREATE_ITEM: {
      create(draft, action.payload);
      break;
    }

    case TodoTypes.UPDATE_ITEM: {
      update(draft, action.payload);
      break;
    }

    case TodoTypes.REMOVE_ITEM: {
      remove(draft, action.payload);
      break;
    }

    case TodoTypes.REMOVE_ITEMS: {
      const ids = action.payload;
      ids.forEach((id: string) => remove(draft, id));
      break;
    }
  }
});

type ISLists = {
  byId: { [id: string]: { id: string, title: string, items: string[] } },
  allIds: string[],
};

const ISLists = { byId: {}, allIds: [] }

const lists = (
  state: ISLists = ISLists,
  action: Action,
) => produce(state, (draft) => {
  switch (action.type) {
    case TodoTypes.CREATE_LIST: {
      create(draft, action.payload);
      break;
    }

    case TodoTypes.UPDATE_LIST: {
      update(draft, action.payload);
      break;
    }

    case TodoTypes.REMOVE_LIST: {
      remove(draft, action.payload);
      break;
    }

    case TodoTypes.CREATE_ITEM_TO_LIST: {
      const { listId, id } = action.payload;
      draft.byId[listId].items.push(id);
      break;
    }

    case TodoTypes.REMOVE_ITEM_FROM_LIST: {
      const { listId, id } = action.payload;
      const index = draft.byId[listId].items.findIndex((i: string) => i === id);
      draft.byId[listId].items.splice(index, 1);
      break;
    }
  }
});

export const todo = combineReducers({ items, lists });
