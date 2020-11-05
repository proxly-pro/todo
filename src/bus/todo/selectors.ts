import { State } from '@bus/index';
import { Item } from '@bus/todo/actions';

export const getListById = (state: State, id: string) =>
  state.todo.lists.byId[id];

export const getLists = (state: State) =>
  state.todo.lists.allIds.map((id: string) => getListById(state, id));

export const getItemById = (state: State, id: string) =>
  state.todo.items.byId[id];

export const getItemsByIds = (state: State, ids: string[], search: string) => {
  const items = ids.map((id: string) => getItemById(state, id));

  return items.filter((item: Item) =>
    item.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
};
