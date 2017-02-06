import * as React from 'react';
import { Link } from 'react-router';
import { Footer } from 'react-materialize';

interface Props { }
interface State { }

const footerStyle = {
  position: 'fixed',
  width: "100%",
  bottom: 0,
}

export default class Foot extends React.Component<Props, State> {
  render() {
    return (
      <Footer style={footerStyle} copyrights="&copy; 2017 Copyright Text"
        moreLinks={
          <Link to="/" className="grey-text text-lighten-4 right">More Links</Link>
        }
        links={
          <ul>
            <li><Link to="/" className="grey-text text-lighten-3">Link 1</Link></li>
          </ul>
        }
        className='example light-blue darken-4'
      >
        <h5 className="white-text">Footer Content</h5>
        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </Footer>
    )
  }
}