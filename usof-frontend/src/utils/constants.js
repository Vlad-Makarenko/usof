export const API_URL = 'http://localhost:5000/api';
export const SERVER_URL = 'http://localhost:5000';
export const AVATAR_URL = 'http://localhost:5000/avatars';
export const PAGE_LIMIT = 10;
export const SORT_RADIOS = [
  { name: 'Popular', value: 'Popular' },
  { name: 'New', value: 'New' },
];
export const DATE_RADIOS = [
  { name: 'Day', value: 'Day' },
  { name: 'Week', value: 'Week' },
  { name: 'Month', value: 'Month' },
];
export const DEFAUL_FILTERS = {
  date: null,
  category: null,
  sort: 'New',
  order: 'desc',
  search: '',
};
