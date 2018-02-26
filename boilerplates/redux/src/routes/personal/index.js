import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { injectReducer } from '../../store/reducers';


export default function PersonalRoute({ store, ...props }) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Personal: () => import(/* webpackChunkName: "personal" */ './components/PersonalContainer'),
          reducer: () => import(/* webpackChunkName: "personalReduer" */ './modules/personalReduer'),
        },
        render(loaded) {
          const Personal = loaded.Personal.default;
          const reducer = loaded.reducer.default;
          injectReducer(store, { key: 'personal', reducer });
          return <Personal />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300,
      })}
    />
  );
}
