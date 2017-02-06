import * as React from 'react';
import { Link } from 'react-router';
import { Navbar, Icon } from 'react-materialize';

interface Props {}
interface State {}

export default class Nav extends React.Component<Props, State> {
  render() {
    return (
      <Navbar className="light-blue darken-4" brand='Skynet' right>
        <li className="waves-effect waves-light"><Link to="/"><Icon>search</Icon></Link></li>
        <li className="waves-effect waves-light"><Link to="dashboard"><Icon>view_module</Icon></Link></li>
        <li className="waves-effect waves-light"><Link to="notfound"><Icon>refresh</Icon></Link></li>
        <li className="waves-effect waves-light"><Link to="/"><Icon>more_vert</Icon></Link></li>
      </Navbar>
    );
  }
}