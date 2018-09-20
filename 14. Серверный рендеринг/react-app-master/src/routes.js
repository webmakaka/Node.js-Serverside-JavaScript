import App from './App';
import { getFilms } from './actions';

const routes = [
  {
    name: 'main',
    path: '/',
    exact: true,
    component: App,
    fetchInitialData: () => getFilms(),
  },
  {
    name: 'search',
    path: '/search',
    exact: true,
    component: App,
    fetchInitialData: (url, query) => getFilms(null, query),
  }
];

export default routes;
