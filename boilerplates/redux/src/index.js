import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/createStore';
// import rootSaga from './saga';
import App from './containers/App';
import updataPrompt from './components/UpDataPrompt';

// init state
const initialState = window.INITIAL_STATE;
const { store } = createStore(initialState);

// run saga
// runSaga();

// Render Setup
const MOUNT_NODE = document.getElementById('root');

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
      render(App);
    });
  }
}

// start
render(App);

// register service worker
registerServiceWorker(updataPrompt);
