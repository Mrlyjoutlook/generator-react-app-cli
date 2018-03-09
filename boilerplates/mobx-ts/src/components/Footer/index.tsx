import * as React from 'react';
import './index.less';

class Footer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="footer">
        <span>
          Project address：<a href="https://github.com/Mrlyjoutlook/generator-react-app-cli">
            github
          </a>
        </span>
      </div>
    );
  }
}

export default Footer;
