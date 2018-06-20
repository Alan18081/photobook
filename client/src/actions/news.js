import {
  FETCH_NEWS,
  FETCH_NEWS_SUCCESS,
  DELETE_NEWS,
  ADD_NEWS
} from './types';

export const deleteNews = (id) => ({
  type: DELETE_NEWS,
  payload: id
});

export const fetchNews = (id) => ({
  type: FETCH_NEWS,
  payload: id
});

export const fetchNewsSuccess = (news,size) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: {
    news,
    size
  }
});

export const addNews = (newsItem) => ({
  type: ADD_NEWS,
  payload: newsItem
});