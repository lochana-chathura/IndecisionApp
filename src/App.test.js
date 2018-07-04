import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App appName="My App"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
