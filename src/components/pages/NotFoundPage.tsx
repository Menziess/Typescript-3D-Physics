import * as React from 'react';
import Head from '../app/Head';
import Foot from '../app/Foot';

interface Props {}
interface State {}

export default class NotFoundPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Head/>
        <h3>Not Found</h3>
      </div>
    )
  }
}