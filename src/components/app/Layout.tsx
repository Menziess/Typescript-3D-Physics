import * as React from 'react';
import { Link } from 'react-router';
import Nav  from './Nav';
import Head from './Head';
import Foot from './Foot';

interface Props {}
interface State {}

export default class Layout extends React.Component<Props, State> {
  render() {
    return (
      <div className="app-container">
        <Nav/>
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}