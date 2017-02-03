import * as React from 'react';
import Hello from '../graphics/Hello'; // Three
import RotatingCubes from '../graphics/RotatingCubes'; // Three

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <RotatingCubes/>
      </div>
    )
  }
}