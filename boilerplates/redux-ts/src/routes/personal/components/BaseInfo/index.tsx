import * as React from 'react';
import { bundleFactory } from 'utils/bundle';

const baseInfoItem = require('bundle-loader?lazy&name=baseInfoItem!../BaseInfoItem');

interface PropsTypes {
  BaseInfoItem: React.ReactType;
}

class BaseInfo extends React.Component<PropsTypes, any> {

  render() {
    const { BaseInfoItem } = this.props;
    return (
      <div>
        <h2>Component add ok!</h2>
        <BaseInfoItem />
      </div>
    );
  }
}

export default bundleFactory(BaseInfo, {
  BaseInfoItem: baseInfoItem
});
