import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

export default function LabelRoute({ ...props }) {
  return (
    <Route
      {...props}
      component={Loadable.Map({
        loader: {
          Labels: () => import(/* webpackChunkName: "label" */ './components/LabelsContainer'),
        },
        render(loaded) {
          const Labels = loaded.Labels.default;
          return <Labels />;
        },
        loading() {
          return <div>Loading...</div>;
        },
        delay: 300,
      })}
    />
  );
}
