import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

export class RouteDataLoader extends Component {
  componentWillReceiveProps(nextProps) {
    let resultQuery = {};
    if (nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.location.search !== this.props.location.search) {
      matchRoutes(this.props.routes, nextProps.location.pathname).forEach(({route, match}) => {
        const query = nextProps.location && nextProps.location.search ?
          new URLSearchParams(nextProps.location.search) : false;

        if (query && query.has('search')) {
          resultQuery.search = query.get('search');
        }
        console.log(match.url)
        this.props.dispatch(route.fetchInitialData(match.url, resultQuery));
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(RouteDataLoader);
