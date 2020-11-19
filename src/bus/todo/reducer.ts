// Core
import produce from 'immer';
import { combineReducers } from 'redux';
import { Optional, Overwrite } from 'utility-types';

// Types
import {
  TodoTypes,
  List,
  Item,
  ListsState,
  ItemsState,
  ListActionTypes,
  ItemActionTypes,
} from './types';

type Draft = Optional<Overwrite<ListsState, ItemsState>, 'allIds'>;
type Entity = Optional<Overwrite<List, Item>, 'items'>;

const create = (draft: Draft, entity: Entity) => {
  draft.byId[entity.id] = entity;

  if (draft.allIds) {
    draft.allIds && draft.allIds.push(entity.id);
  }
};

const update = (draft: Draft, id: string, title: string) => {
  draft.byId[id].title = title;
};

const remove = (draft: Draft, id: string) => {
  delete draft.byId[id];

  if (draft.allIds) {
    const index = draft.allIds.findIndex((i: string) => i === id);

    draft.allIds.splice(index, 1);
  }
};

const initialStateItems: ItemsState = { byId: {} };

const items = (state = initialStateItems, action: ItemActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TodoTypes.CREATE_ITEM: {
        create(draft, action.payload);
        break;
      }

      case TodoTypes.UPDATE_ITEM: {
        const { id, title } = action.payload;

        update(draft, id, title);

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

const initialStateLists: ListsState = { byId: {}, allIds: [] };

const lists = (state = initialStateLists, action: ListActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TodoTypes.CREATE_LIST: {
        create(draft, action.payload);
        break;
      }

      case TodoTypes.UPDATE_LIST: {
        const { id, title } = action.payload;

        update(draft, id, title);

        break;
      }

      case TodoTypes.REMOVE_LIST: {
        remove(draft, action.payload);
        break;
      }

      case TodoTypes.REORDER_ITEM_IN_LIST: {
        const { id, startIndex, endIndex } = action.payload;

        const items = draft.byId[id].items;

        const [removed] = items.splice(startIndex, 1);

        items.splice(endIndex, 0, removed);

        break;
      }

      case TodoTypes.MOVE_ITEM_FROM_LIST: {
        const {
          sourceId,
          destinationId,
          sourceIndex,
          destinationIndex,
        } = action.payload;

        const sourceItems = draft.byId[sourceId].items;
        const destinationItems = draft.byId[destinationId].items;

        const [removed] = sourceItems.splice(sourceIndex, 1);

        destinationItems.splice(destinationIndex, 0, removed);

        break;
      }

      case TodoTypes.CREATE_ITEM_TO_LIST: {
        const { listId, id } = action.payload;

        draft.byId[listId].items.push(id);

        break;
      }

      case TodoTypes.REMOVE_ITEM_FROM_LIST: {
        const { listId, id } = action.payload;

        const index = draft.byId[listId].items
          .findIndex((i: string) => i === id);

        draft.byId[listId].items.splice(index, 1);

        break;
      }
    }
  });

export const todo = combineReducers({ items, lists });
