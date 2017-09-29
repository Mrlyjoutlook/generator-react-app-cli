import * as React from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from '../../store/reducers';
import { CustomRouteParams } from './index.types';
import Bundle from 'utils/bundle';

const loginContainer = require('bundle-loader?lazy&name=login!./components/LoginContainer');

export default function LoginRoute(param: CustomRouteParams) {
  return (
    <Route
      path={param.path}
      render={() => (
        <Bundle
          modules={{
            Login: loginContainer
          }}
        >
          {({ Login }) => {
            const reducer = require('./modules/loginReduer').default;
            injectReducer(param.store, { key: 'login', reducer });
            return <Login />;
          }}
        </Bundle>
      )}
    />
  );
}
