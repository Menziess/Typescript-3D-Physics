import * as React from 'react';
import Head from '../app/Head';
import Foot from '../app/Foot';

interface Props {}
interface State {}

export default class Dashboard extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Head/>
        <h3>Dashboard</h3>
        <Foot/>
      </div>
    )
  }
}