import React from 'react';
import FilmItem from '../FilmItem';
import PropTypes from 'prop-types';
import './index.css';

const Main = (props) => (
  <main className='content app__main'>  
    <div className='content-info'>
      <ul className='film-list'>
        {props.films.length && props.films.length ? (
          props.films.map(film => (
            <FilmItem
              film={film}
              id={film.id}
              key={film.id}
            />)))
        : (<h2 className='no-data'>No films found</h2>)
        }
      </ul>
    </div>
  </main>  
);

Main.propTypes = {
  name: PropTypes.string
};

export default Main;