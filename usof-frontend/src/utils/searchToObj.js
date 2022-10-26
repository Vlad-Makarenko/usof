const initialFilters = {
  page: 1,
  date: '',
  categories: '',
  sort: 'createdAt',
  sordDir: 'desc',
  user: '',

};

/**
 *
 * @param {String} searchStr
 */

export const searchToObj = (searchStr) => {
  const pairs = searchStr.slice(1).split('&');
  console.log(pairs);
  if (pairs.length) {
    const KeyVal = pairs.map((pair) => {
      const KeyValArr = pair.split('=');
      return { [KeyValArr[0]]: KeyValArr[1] };
    });
    const res = KeyVal.reduce((obj, item) => ({ ...obj, ...item }), {});
    console.log({ ...res });
    return { ...initialFilters, ...res };
  }
  return initialFilters;
};
