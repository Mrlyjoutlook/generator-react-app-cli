import React from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from '../../store/reducers';
import LazilyLoad, { importLazy } from 'utils/lazilyload';

export default function LoginRoute({ store, ...props }) {
  return (
    <Route
      {...props}
      render={() => (
        <LazilyLoad
          modules={{
            Login: () => importLazy(import(/* webpackChunkName: "login" */ './components/LoginContainer')),
          }}
        >
          {({ Login }) => {
            const reducer = require('./modules/loginReduer').default;
            injectReducer(store, { key: 'login', reducer });
            return <Login />;
          }}
        </LazilyLoad>
      )}
    />
  );
}
