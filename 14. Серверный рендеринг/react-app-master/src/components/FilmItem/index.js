import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const FilmItem = (props) => {
  const { film } = props;

  return (
    <li className='film-list__item'>
      <div className='film-item'>
        <div className='film-item__img-wrap'>
          <img alt='film' className='film-item__img' src={film.poster_path} />
        </div>
        <div className='film-item__info'>
          <div className='film-item__title'>{film.title}</div>
          <div className='film-item__year'>{film.release_date.substr(0,4)}</div>
        </div>
        <div className='film-item__genre'>{film.genres[0]}</div>
      </div>
    </li>
  );
};

FilmItem.propTypes = {
  film: PropTypes.object,
  onFilmSelect: PropTypes.func,

};

export default FilmItem;