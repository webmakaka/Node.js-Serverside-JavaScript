import React from 'react';
import url from 'url';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../src/reducers';
import routes from '../../src/routes';

const renderPage = (req, res, next) => {
  let resultQuery = {};

  const pathname = url.parse(req.url, true).pathname;
  console.log('render')
  if (req.query && req.query.search) {
    resultQuery.search = req.query.search;
    req.query.searchBy = req.query.searchBy ? req.query.searchBy : 'title';
  }

  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );

  const promises = matchRoutes(routes, pathname).map(({route, match}) => {
    return store.dispatch(route.fetchInitialData(match.url, resultQuery));
  });

  Promise.all(promises).then(() => {
      const markup = renderToString(
        <Provider store={store} >
          <StaticRouter context={store.getState()} location={req.originalUrl}>
            { renderRoutes(routes) }
          </StaticRouter>
        </Provider>,
      );

    res.locals.preloadedState = JSON.stringify(store.getState());
    res.locals.content = markup;
    next();

  }).catch(next);

};

export default renderPage;
