import {
  SET_SEARCH_QUERY,
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_START,
  FETCH_SEARCH_RESULTS_SUCCESS
} from './types';

export const fetchSearchResults = () => ({
  type: FETCH_SEARCH_RESULTS
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
});

export const fetchSearchResultsStart = () => ({
  type: FETCH_SEARCH_RESULTS_START
});

export const fetchSearchResultsSuccess = (results) => ({
  type: FETCH_SEARCH_RESULTS_SUCCESS,
  payload: results
});