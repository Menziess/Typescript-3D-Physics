import * as React from 'react';

interface Props { }
interface State { }

export default class Head extends React.Component<Props, State> {
  render() {
    return (
      <header>
        <p>
          Header
            <img className="logo" width="20%" height="20%" src="./img/Octocat.png" />
        </p>
      </header>
    )
  }
}