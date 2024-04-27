import { Pagination } from '@/schemas';

export const generateRedisKey = (key: string) => {
  return `category:${key}`;
};

export const generateRedisPaginationKey = (data: Pagination) => {
  const { limit, order, orderBy, page, fields, search } = data;

  let key = 'category:pagination';

  if (limit) {
    key += `:${limit}`;
  }

  if (order) {
    key += `:${order}`;
  }

  if (orderBy) {
    key += `:${orderBy}`;
  }

  if (page) {
    key += `:${page}`;
  }

  if (fields) {
    const fFields = fields.replace(/,/g, ':');
    key += `:${fFields}`;
  }

  if (search) {
    const fSearch = search.replace(/ /g, ':');
    key += `:${fSearch}`;
  }

  return key;
};
