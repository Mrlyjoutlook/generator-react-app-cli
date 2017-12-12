import React from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from '../../store/reducers';
import Bundle from 'utils/bundle';

const loginContainer = require('bundle-loader?lazy&name=login!./components/LoginContainer');

export default function LoginRoute({ store, ...props }) {
  return (
    <Route
      {...props}
      render={() => (
        <Bundle
          modules={{
            Login: loginContainer,
          }}
        >
          {({ Login }) => {
            const reducer = require('./modules/loginReduer').default;
            injectReducer(store, { key: 'login', reducer });
            return <Login />;
          }}
        </Bundle>
      )}
    />
  );
}
