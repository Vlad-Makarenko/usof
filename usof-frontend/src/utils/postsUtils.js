/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import api from '../http';
import { API_URL, PAGE_LIMIT } from './constants';

/**
 *
 * @param {Array} posts
 * @param {Object} filters
 */
export const filterPosts = (posts, filters) => {
  let resultPosts = [];

  resultPosts = posts.filter((value) =>
    value.title.toLowerCase().includes(filters.search.toLowerCase()));

  resultPosts = filters.category
    ? resultPosts.filter(
      (val) =>
        val.categories.filter((tag) => tag.id === filters.category).length,
    )
    : resultPosts;

  switch (filters.date) {
    case 'Day':
      resultPosts = resultPosts.filter(
        (val) =>
          new Date(val.createdAt) > new Date(new Date() - 60 * 1000 * 60 * 24),
      );
      break;
    case 'Week':
      resultPosts = resultPosts.filter(
        (val) =>
          new Date(val.createdAt) >
          new Date(new Date() - 60 * 1000 * 60 * 24 * 7),
      );
      break;
    case 'Month':
      resultPosts = resultPosts.filter(
        (val) =>
          new Date(val.createdAt) >
          new Date(new Date() - 60 * 1000 * 60 * 24 * 31),
      );
      break;
    default:
      break;
  }

  if (filters.order === 'asc') {
    resultPosts =
      filters.sort === 'Popular'
        ? resultPosts.sort((a, b) => a.likeCount - b.likeCount)
        : resultPosts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
  } else {
    resultPosts =
      filters.sort === 'Popular'
        ? resultPosts.sort((a, b) => b.likeCount - a.likeCount)
        : resultPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
  }
  return resultPosts;
};

export const countTotalPages = (posts) => Math.ceil(posts.length / PAGE_LIMIT);

export const getCurentPosts = (posts, page) => {
  if (page > 0) {
    const offset = (page - 1) * PAGE_LIMIT;
    return posts.slice(offset, offset + PAGE_LIMIT);
  }
  return [];
};

export const checkSaved = async (postId) => {
  try {
    const { data } = await api.get(`${API_URL}/posts/favorites`);
    return data.posts.filter((post) => post.Post.id === postId).length;
  } catch (error) {
    console.log(error);
  }
};
