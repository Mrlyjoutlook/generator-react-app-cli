import React from 'react';
import ReactDOM from 'react-dom';
import UpData from './UpData';

export default () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(<UpData close={close} />, div);

  return {
    close,
  };
};
