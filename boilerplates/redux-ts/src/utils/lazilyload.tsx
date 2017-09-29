/**
 * 在typescript module 为commonjs情况下，部分使用import()会出现async编译成sync的情况
 * if use
 *    需要吧module设置成amd，但chunkfilename部分情况下会失效
 * 请可以使用bundle.tsx搭配bundle-loader插件
 * 用法和本模块一致
 */

import * as React from 'react';
import PropTypes from 'prop-types';

interface ModulesObj {
  [propName: string]: () => Promise<any>;
}

interface PropsTypes {
  children: PropTypes.func.isRequired;
  modules: ModulesObj;
}

interface StateTypes {
  isLoaded: boolean;
  modules?: object;
}

class LazilyLoad extends React.Component<PropsTypes, StateTypes> {

  _isMounted: boolean;

  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();
  }

  componentDidUpdate(previous: PropsTypes) {
    const shouldLoad = !!Object.keys(this.props.modules).filter((key) => {
      return this.props.modules[key] !== previous.modules[key];
    }).length;
    if (shouldLoad) {
      this.load();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load() {
    this.setState({
      isLoaded: false,
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map(key => modules[key]()))
      .then(values => (keys.reduce((agg, key, index) => {
        agg[key] = values[index];
        return agg;
      }, {})))
      .then((result) => {
        if (!this._isMounted) {
          return null;
        }
        this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return null;
    }
    return React.Children.only(this.props.children(this.state.modules));
  }
}

export const lazilyLoadFactory = (Component, modules) => {
  return function LazilyLoadFactory(props: any) {
    return (
      <LazilyLoad modules={modules}>
        {mods => <Component {...mods} {...props} />}
      </LazilyLoad>
    );
  };
};

interface LoadStateTypes {
  Component: null | React.ReactType;
}

export const lazilyLoadComponent = loadComponent => (
  class LazilyLoadComponent extends React.Component<any, LoadStateTypes> {

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

      loadComponent()
        .then(module => module.default)
        .then(Component => this.setState({ Component }))
        .catch((err) => {
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return Component && <Component {...this.props} />;
    }
  }
);

export const importLazy = promise => (
  promise.then(result => result.default)
);

export default LazilyLoad;
