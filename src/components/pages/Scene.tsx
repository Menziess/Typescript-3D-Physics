import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import Babylon from '../graphics/Babylon';
import Three from '../graphics/Three';

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
  
  render() {
    return (
      <div>
        <Three/>
      </div>
    )
  }
}