import * as React from 'react';
import { Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';

interface Props {
  path: string;
}

interface Loaded {
  Labels: {
    default: React.ComponentClass;
  };
}

export default function LabelRoute(props: Props) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Labels: () =>
            import(/* webpackChunkName: "label" */ './components/LabelsContainer')
        },
        render(loaded: Loaded) {
          const Labels = loaded.Labels.default;
          return <Labels />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300
      })}
    />
  );
}
