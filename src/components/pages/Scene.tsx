import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Scene from '../graphics/views/Scene';

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
  
  render() {
    return (
      <div>
        <Scene/>
      </div>
    )
  }
}