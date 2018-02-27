/// <reference path="./index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import { createStoreFactory } from './store';
// import rootSaga from './saga';
import App from './containers/App';
import updataPrompt from './components/UpDataPrompt';

// perf
window.Perf = __DEV__ ? require('react-addons-perf') : {};

// init state
const initialState: object = window.INITIAL_STATE || {};
const { store } = createStoreFactory(initialState);

// run saga
// runSaga();

// Render Setup
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>
  , MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module['hot']) {
    // Setup hot module replacement
    module['hot'].accept('./containers/App', () => {
      render(App);
    });
  }
}

// start
render(App);

// register service worker
registerServiceWorker(updataPrompt);
