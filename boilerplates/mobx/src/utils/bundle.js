/**
 * 需要搭配bundle-loader插件
 */

import React from 'react';
import { isEqual } from 'lodash';

class Bundle extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      result: {},
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.modules, this.props.modules)) {
      this.load(nextProps);
    }
  }

  loadComponent = (func) => {
    return new Promise((resolve) => {
      func((comp) => {
        resolve(comp.default);
      });
    });
  }

  load = () => {
    this.setState({
      isLoaded: false,
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map(key => this.loadComponent(modules[key])))
      .then(values => (keys.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
      }, {})))
      .then((result) => {
        this.setState({ result, isLoaded: true });
      });
  }

  render() {
    return this.state.isLoaded ? this.props.children(this.state.result) : null;
  }
}

export const bundleFactory = (Component, modules) => {
  return function BundleFactory(props) {
    return (
      <Bundle modules={modules}>
        {mods => <Component {...mods} {...props} />}
      </Bundle>
    );
  };
};

export const bundleComponent = loadComponent => (
  class BundleComponent extends React.Component {
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

      loadComponent((Component) => {
        this.setState(Component);
      });
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
