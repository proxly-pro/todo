import { schema } from 'normalizr';

export const item = new schema.Entity('users');

export const list = new schema.Entity('articles', { items: [item] });
