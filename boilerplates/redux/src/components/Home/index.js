import React, { Component } from 'react';
import './index.less';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>
          <p>history: login</p>
          <p>load login.chunk.js</p>
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
