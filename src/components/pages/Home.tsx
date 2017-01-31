import * as React from 'react';
import Scene from './partials/Scene';

interface Props {}
interface State {}

export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h3>Home</h3>
        <Scene/>
      </div>
    )
  }
}