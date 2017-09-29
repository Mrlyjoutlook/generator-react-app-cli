import * as React from 'react';
import BaseInfo from '../BaseInfo';
import { bundleComponent } from 'utils/bundle';

import './index.less';

const otherInfo = require('bundle-loader?lazy&name=otherInfo!../OtherInfo');

interface PropsTypes {

}

interface StateTypes {
  visible: boolean;
}

class PersonalContainer extends React.Component<PropsTypes, StateTypes> {

  state = {
    visible: false,
  };

  handleOnClick = () => {
    this.setState({
      visible: true,
    });
  }

  asyncComponent = () => {
    const OtherInfo = bundleComponent(otherInfo);
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
