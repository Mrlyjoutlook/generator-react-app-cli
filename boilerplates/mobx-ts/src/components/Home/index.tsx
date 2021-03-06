import * as React from 'react';
import './index.less';

class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="home">
        <div>
          <p>history: label</p>
          <p>load label.chunk.js</p>
        </div>
        <div>
          <p>history: personal</p>
          <p>load personal.chunk.js.</p>
        </div>
        <div>
          <p>history: *</p>
          <p>not found</p>
        </div>
      </div>
    );
  }
}

export default Home;
