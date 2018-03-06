import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

export default function PersonalRoute({ ...props }) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Todo: () => import(/* webpackChunkName: "todo" */ './components/TodoContainer'),
        },
        render(loaded) {
          const Todo = loaded.Todo.default;
          return <Todo />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300,
      })}
    />
  );
}
