import { combineReducers } from 'redux';
import {itemsHasErrored, itemsIsLoading, items } from './films';
import { changeSearchText } from './changeSearchText';

const rootReducer = combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  changeSearchText,
});

export default rootReducer;
