import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.less';
import { labelRoute, todoRoute } from '../../config/routesConfig';

class Navigation extends Component {
  render() {
    const styleObj = {
      activeStyle: { color: '#ace9f1' },
      style: {
        textDecoration: 'none',
        color: '#fff',
      },
    };
    return (
      <div className="navigation">
        <NavLink exact to="/" {...styleObj}>Home</NavLink>
        <NavLink to={labelRoute.path} {...styleObj}>Label</NavLink>
        <NavLink to={todoRoute.path} {...styleObj}>Todo</NavLink>
        <NavLink to="/mrlyj" {...styleObj}>Not Found</NavLink>
      </div>
    );
  }
}

export default Navigation;
