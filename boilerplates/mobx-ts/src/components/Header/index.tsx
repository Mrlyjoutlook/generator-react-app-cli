import * as React from 'react';
import './index.less';

class Header extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="header">
        <span>Generator React App Cli</span>
      </div>
    );
  }
}

export default Header;
