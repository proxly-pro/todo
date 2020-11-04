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

    case TodoTypes.CREATE_ITEM: {
      const { parentId, item } = action.payload;
      draft.byId[parentId].items.push(item.id);
      break;
    }

    case TodoTypes.REMOVE_ITEM: {
      const { parentId, id } = action.payload;
      const index = draft.byId[parentId].items.findIndex((i: string) => i === id);
      draft.byId[parentId].items.splice(index, 1);
      break;
    }

    // TODO: Дописать новую структуру обновления линков
    // case TodoTypes.CREATE_ITEM:
    // case TodoTypes.UPDATE_ITEM:
    // case TodoTypes.REMOVE_ITEM: {
    //   items(draft, action);
    //   break;
    // }
  }
});

type ISItems = {
  byId: { [id: string]: { id: string, title: string } },
  allIds: string[],
  search: string,
};

const ISItems = { byId: {}, allIds: [], search: '' };

const items = (
  state: ISItems = ISItems,
  action: Action
) => produce(state, (draft) => {
  switch (action.type) {
    case TodoTypes.CREATE_ITEM: {
      const { item } = action.payload;
      create(draft, item);
      break;
    }

    case TodoTypes.UPDATE_ITEM: {
      update(draft, action.payload);
      break;
    }

    case TodoTypes.REMOVE_ITEM: {
      const { id } = action.payload;
      remove(draft, id);
      break;
    }

    case TodoTypes.SEARCH_ITEM: {
      draft.search = action.payload;
      break;
    }
  }
});

export const todo = combineReducers({ lists, items });
