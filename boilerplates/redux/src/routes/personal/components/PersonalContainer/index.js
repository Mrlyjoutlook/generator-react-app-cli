import React, { Component } from 'react';
// import { object } from 'prop-types';
import BaseInfo from '../BaseInfo';
import { lazilyLoadComponent } from 'utils/lazilyload';
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
    const OtherInfo = lazilyLoadComponent(() => import(/* webpackChunkName: "otherInfo" */ '../OtherInfo'));
    return <OtherInfo />;
  }

  render() {
    const { visible } = this.state;

    return (
      <div className="personal">
        <p>eg: Click add component</p>
        <div onClick={this.handleOnClick} className="btn">Add</div>
        <p>eg: load baseInfo.chunk.js</p>
        <p>eg: load otherInfo.chunk.js</p>
        {visible && <BaseInfo />}
        {visible && this.asyncComponent()}
      </div>
    );
  }
}

export default PersonalContainer;
