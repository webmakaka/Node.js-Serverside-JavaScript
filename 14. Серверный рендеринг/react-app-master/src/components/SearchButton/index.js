import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = (props) => (
  <button
    className='search-button btn btn-lg btn-primary'
    onClick={props.handleSearch}
    type='button'
    > Search
  </button>
);


SearchButton.propTypes = {
  name: PropTypes.string
};

export default SearchButton;