import * as React from 'react';
import Scene from './partials/Scene';
import RotatingCubes from './partials/RotatingCubes';

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <RotatingCubes />
      </div>
    )
  }
}