import React, { Component } from 'react';
import { connect } from 'react-redux';
import helpers from './helpers';
import { getFilms } from './actions';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

class App extends Component {

  doSearch = (data) => {
    console.log('do search', data);
    this.props.fetchData(`${helpers.routes.base}/movies`, {
      search: data,
      searchBy: 'title',
    });
  }
  
  render() {
    const {
      isLoading,
      films,
    } = this.props;

    if (isLoading) {
      return (
        <div className='app__inner'>
            <Header
              onSearch={this.doSearch}
            />
            <main className='content app__main'>
              <p className='loading'>Loading…</p>
            </main>
            <Footer />
        </div>
      );
    }   
    return (
      <div className='app__inner'>
        <Header
          onSearch={this.doSearch}
        />
        <Main
          films={films}
        />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, query) => dispatch(getFilms(url, query)),
  };
};

const mapStateToProps = state => {
  return {
      films: state.items,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
