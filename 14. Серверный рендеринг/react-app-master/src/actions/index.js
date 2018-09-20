import helpers from '../helpers';

/*
 * action types
 */

export const REQUEST_FILMS = 'REQUEST_FILMS';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const RECEIVE_FILMS = 'RECEIVE_FILMS';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
export const CLEAR_SEARCH_TEXT = 'CLEAR_SEARCH_TEXT';

/*
 * action creators
 */
export const clearSearchText = () => {
  return {
    type: CLEAR_SEARCH_TEXT,
  };
};

export const changeSearchText = (value: string) => {
  return {
    type: CHANGE_SEARCH_TEXT,
    value,
  };
};

export const itemsIsLoading = bool => ({
  type: ITEMS_IS_LOADING,
  isLoading: bool,
});

export const receiveFilms = items => ({
  type: RECEIVE_FILMS,
  items,
});

export const itemsHasErrored = bool => ({
  type: ITEMS_HAS_ERRORED,
  hasErrored: bool,
});

export const getFilms = (url, query) => dispatch => {
  dispatch(itemsIsLoading(true));
  return helpers.fetchAllData(url, query)
    .then(response => {
      dispatch(itemsIsLoading(false));
      if (query) {
        dispatch(changeSearchText(query.search));
      }
      return response;
    })
    .then(response => {
      response = response.data.length ? response.data : [];
      dispatch(receiveFilms(response));
    })
    .catch(() => dispatch(itemsHasErrored(true)));
};

