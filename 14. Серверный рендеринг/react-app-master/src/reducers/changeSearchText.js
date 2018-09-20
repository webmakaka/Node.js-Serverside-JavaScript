// @flow

import { CHANGE_SEARCH_TEXT, CLEAR_SEARCH_TEXT } from '../actions';

const defaultState = {
  searchText: '',
};

export const changeSearchText = (state: {searchText: string} = defaultState,
  action: { type: string, value: string }) => {
    const { type, value } = action;
    switch (type) {
      case CHANGE_SEARCH_TEXT: {
        return {
          searchText: value,

        };
      }
      case CLEAR_SEARCH_TEXT: {
        return {
          searchText: '',
        };
      }

      default:
        return state;
    }
};
