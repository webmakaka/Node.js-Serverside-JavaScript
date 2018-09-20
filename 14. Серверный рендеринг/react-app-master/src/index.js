import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import RouteDataLoader from './route-data-loader';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import routes from './routes';

const state = window.preloadedState ? window.preloadedState : {};
delete window.preloadedState;

const store = createStore(
  reducer,
  state,
  applyMiddleware(thunk),
);

console.log('store', store.getState());
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <RouteDataLoader dispatch={store.dispatch} routes={routes} >
        { renderRoutes(routes) }
      </RouteDataLoader>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);