export const API_URL = 'https://usof-stackoverclone.herokuapp.com/api';
export const SERVER_URL = 'https://usof-stackoverclone.herokuapp.com';
export const AVATAR_URL = 'https://usof-stackoverclone.herokuapp.com/avatars';
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
