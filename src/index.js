import React from 'react';
import ReactDOM from 'react-dom';
import Application from './modules/app';
import { AppStateProvider } from './state';
import './index.css';

const AppWithProviders = () => (
  <AppStateProvider>
    <Application />
  </AppStateProvider>
);

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));
