import * as React from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from '../../store/reducers';
import { CustomRouteParams } from './index.types';
import Bundle from 'utils/bundle';

const personalContainer = require('bundle-loader?lazy&name=personal!./components/PersonalContainer');

export default function PersonalRoute(param: CustomRouteParams) {
  return (
    <Route
      path={param.path}
      render={() => (
        <Bundle
          modules={{
            Personal: personalContainer
          }}
        >
          {({ Personal }) => {
            const reducer = require('./modules/personalReduer').default;
            injectReducer(param.store, { key: 'personal', reducer });
            return <Personal />;
          }}
        </Bundle>
      )}
    />
  );
}
