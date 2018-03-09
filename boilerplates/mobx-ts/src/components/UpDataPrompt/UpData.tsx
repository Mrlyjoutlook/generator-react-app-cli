import * as React from 'react';
import './index.less';

export interface PropsTypes {
  close: () => void;
}

class UpData extends React.PureComponent<PropsTypes, {}> {
  handleOnClick = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="updata">
        <div className="updata_bg updata_bg-anim" />
        <div className="updata_block updata_block-anim">
          <span>已经为您更新到最新的用应用程序！</span>
          <a onClick={this.handleOnClick}>点击刷新</a>
        </div>
      </div>
    );
  }
}

export default UpData;
