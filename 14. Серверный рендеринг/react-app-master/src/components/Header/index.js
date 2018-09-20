import React from 'react';
import PropTypes from 'prop-types';
import Search  from '../Search';
import EnterSign from '../../logo.js';
import './index.css';

const Header = (props) => (
  <div className='header app__header bg-dark'>
    <div className='container'>
      <span className='logo'><EnterSign /></span>
      <Search 
        submitSearch={props.onSearch}
      />
    </div>  
  </div>
);

Header.propTypes = {
  name: PropTypes.string
};

export default Header;