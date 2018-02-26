import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { injectReducer } from '../../store/reducers';

export default function LoginRoute({ store, ...props }) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Login: () => import(/* webpackChunkName: "login" */ './components/LoginContainer'),
          reducer: () => import(/* webpackChunkName: "loginReduer" */ './modules/loginReduer'),
        },
        render(loaded) {
          const Login = loaded.Login.default;
          const reducer = loaded.reducer.default;
          injectReducer(store, { key: 'login', reducer });
          return <Login />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300,
      })}
    />
  );
}

/**
 * old example only for reference
 */

// import LazilyLoad, { importLazy } from 'utils/lazilyload';

// export default function LoginRoute({ store, ...props }) {
//   return (
//     <Route
//       {...props}
//       render={() => (
//         <LazilyLoad
//           modules={{
// Login: () => importLazy(import(/* webpackChunkName: "login" */ './components/LoginContainer')),
//           }}
//         >
//           {({ Login }) => {
//             const reducer = require('./modules/loginReduer').default;
//             injectReducer(store, { key: 'login', reducer });
//             return <Login />;
//           }}
//         </LazilyLoad>
//       )}
//     />
//   );
// }
