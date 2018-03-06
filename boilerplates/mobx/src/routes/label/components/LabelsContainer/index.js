import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { withRouter } from 'react-router-dom';
// import { object } from 'prop-types';
import './index.less';

@inject('labelsStore')
@observer
class LabelsContainer extends Component {
  static propTypes = {
    labelsStore: PropTypes.observableObject.isRequired,
  };

  handleClick = () => {
    const { labelsStore } = this.props;
    labelsStore.addLabel(this.textInput.value);
  };

  goTodo = () => {
    const { history } = this.props;
    history.push('/todo');
  };

  render() {
    const { labelsStore } = this.props;
    return (
      <div className="labels">
        <div className="labels_set">
          {labelsStore.labels.map(item => (
            <div key={item.time} className="labels_label">
              {item.name}
            </div>
          ))}
        </div>
        <input
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <button onClick={this.handleClick}>add type</button>
        <button onClick={this.goTodo}>go to wirte todo</button>
      </div>
    );
  }
}

export default withRouter(LabelsContainer);
