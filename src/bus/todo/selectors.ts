// Core
import { createSelector } from 'reselect';

import { RootState } from '@store/index';
import { Item } from './types';

const getListAllIds = (state: RootState) => state.todo.lists.allIds;
const getListById = (state: RootState) => state.todo.lists.byId;

export const getLists = createSelector(
  [getListAllIds, getListById],
  (allIds, byId) => allIds.map((id: string) => byId[id]),
);

const getItemById = (state: RootState) => state.todo.items.byId;

export const makeGetItems = (ids: string[], term: string) =>
  createSelector([getItemById], (byId) => {
    const items = ids.map((id: string) => byId[id]);

    return items.filter((item: Item) =>
      item.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
  });
