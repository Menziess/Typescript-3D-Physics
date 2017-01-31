import * as React from 'react';
import { render } from 'react-dom';
import Routes from './components/app/Routes';

window.onload = () => {
  render(
    <Routes/>
    , document.getElementById('root')
  );
};