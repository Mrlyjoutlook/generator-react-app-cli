import * as React from 'react';
import { Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';

interface Props {
  path: string;
}

interface Loaded {
  Todo: {
    default: React.ComponentClass;
  };
}

export default function PersonalRoute(props: Props) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Todo: () =>
            import(/* webpackChunkName: "todo" */ './components/TodoContainer')
        },
        render(loaded: Loaded) {
          const Todo = loaded.Todo.default;
          return <Todo />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300
      })}
    />
  );
}
