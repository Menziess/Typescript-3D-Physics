import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Engine from '../graphics/views/Engine';

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
  
  render() {
    return (
      <div>
        <Engine/>
      </div>
    )
  }
}