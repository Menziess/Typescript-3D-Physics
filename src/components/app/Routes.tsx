import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Scene from '../pages/Scene';
import Dashboard from '../pages/Dashboard';
import NotFoundPage from '../pages/NotFoundPage';

interface Props {}
interface State {}

export default class Routes extends React.Component<Props, State> {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Scene} />
          <Route path="dashboard" component={Dashboard} />
          <Route path="*" component={NotFoundPage}/>
        </Route>
      </Router>
    )
  }
}