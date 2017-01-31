import * as React from 'react';
import { Link } from 'react-router';
import { Navbar, Icon } from 'react-materialize';

interface Props {}
interface State {}

export default class Nav extends React.Component<Props, State> {
  render() {
    return (
      <Navbar className="blue lighten-2" brand='Skynet' right>
        <li><Link to="/"><Icon>search</Icon></Link></li>
        <li><Link to="dashboard"><Icon>view_module</Icon></Link></li>
        <li><Link to="notfound"><Icon>refresh</Icon></Link></li>
        <li><Link to="/"><Icon>more_vert</Icon></Link></li>
      </Navbar>
    );
  }
}