import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.less';
import { loginRoute, personalRoute } from '../../config/routesConfig';

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
        <NavLink to={loginRoute.path} {...styleObj}>Login</NavLink>
        <NavLink to={personalRoute.path} {...styleObj}>Personal</NavLink>
        <NavLink to="/mrlyj" {...styleObj}>Not Found</NavLink>
      </div>
    );
  }
}

export default Navigation;
