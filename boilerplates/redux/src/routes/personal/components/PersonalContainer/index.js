import React, { Component } from 'react';
import Loadable from 'react-loadable';
// import { object } from 'prop-types';
import './index.less';

class PersonalContainer extends Component {
  static propTypes = {
  }

  state = {
    visible: false,
  }

  handleOnClick = () => {
    this.setState({
      visible: true,
    });
  }

  asyncComponent = () => {
    const OtherInfo = Loadable({
      loader: () => import(/* webpackChunkName: "otherInfo" */ '../OtherInfo'),
      loading: () => <div>loading...</div>,
    });
    return <OtherInfo />;
  }

  render() {
    const { visible } = this.state;

    return (
      <div className="personal">
        <p>eg: Click add component</p>
        <div onClick={this.handleOnClick} className="btn">Add</div>
        <p>eg: load otherInfo.chunk.js</p>
        {visible && this.asyncComponent()}
      </div>
    );
  }
}

export default PersonalContainer;
