import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import Store from './modules/store';
// import updataPrompt from './components/UpDataPrompt';

// Render Setup
const MOUNT_NODE = document.getElementById('root');

const store = new Store();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>
    , MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default;
      render(NextApp);
    });
  }
}

// start
render(App);

// register service worker
// registerServiceWorker(updataPrompt);
