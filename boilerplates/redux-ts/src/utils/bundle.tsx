/**
 * 需要搭配bundle-loader插件
 */

import * as React from 'react';
import { isEqual } from 'lodash';

interface PropsTypes {
  children: React.ReactType | JSX.Element | any;
  modules: {
    [propName: string]: () => void;
  };
}

interface StateTypes {
  isLoaded: boolean;
  result: object;
}

class Bundle extends React.Component<PropsTypes, StateTypes> {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      result: {}
    };
  }

  loadComponent = (func) => new Promise((resolve, reject) => {
    func((comp) => {
      resolve(comp.default);
    });
  })

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: PropsTypes) {
    if (!isEqual(nextProps.modules, this.props.modules)) {
      this.load(nextProps);
    }
  }

  load = (props: PropsTypes) => {
    this.setState({
      isLoaded: false
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map(key => this.loadComponent(modules[key])))
      .then(values => (keys.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
      }
      , {})))
      .then((result) => {
          this.setState({ result: result, isLoaded: true });
      });
  }

  render() {
    return this.state.isLoaded ? this.props.children(this.state.result) : null;
  }
}

export const bundleFactory = (Component, modules) => {
  return function BundleFactory(props: any) {
    return (
      <Bundle modules={modules}>
        {mods => <Component {...mods} {...props} />}
      </Bundle>
    );
  };
};

interface LoadStateTypes {
  Component: null | React.ReactType;
}

export const bundleComponent = loadComponent => (
  class BundleComponent extends React.Component<any, LoadStateTypes> {

    constructor() {
      super();
      this.state = {
        Component: null,
      };
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent((Component) => this.setState(Component));
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
);

export default Bundle;
