import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchButton from '../SearchButton';
import { changeSearchText, clearSearchText } from '../../actions';
import PropTypes from 'prop-types';
import './index.css';

class Search extends Component {

  handleKeyPress = (event: SyntheticKeyboardEvent<>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    const {
      searchText,
      clearText,
      submitSearch,
      history } = this.props;

    if (searchText.length > 0) {
      submitSearch(searchText);
      clearText();
      history.push(`/search?search=${searchText}&searchBy=title`);
    }
  }

  render() {
    const { searchText } = this.props;
    return (
      <div className='search app__search'>
        <h1 className='search__title'> Find your movie </h1>
        <div className='search__input-wrapper input-group mb-3'>
          <input
            aria-label='Search'
            className='search__input form-control'
            name='search'
            onChange={(ev) => {this.props.handleChange(ev.target.value);}}
            onKeyPress={this.handleKeyPress}
            placeholder='Search phrase...'
            type='text'
            value={searchText}
          />
        </div>
        <div className='search__controls'>
          <SearchButton handleSearch={this.handleSearch} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  name: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (value) => dispatch(changeSearchText(value)),
    clearText: () => dispatch(clearSearchText()),
  };
};

const mapStateToProps = state => {
  return {
      searchText: state.changeSearchText.searchText,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
