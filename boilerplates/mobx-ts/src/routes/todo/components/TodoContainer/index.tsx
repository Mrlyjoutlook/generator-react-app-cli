import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ELabelStore } from '../../../label/modules/labels';
import { ETodoStore } from '../../modules/todo';
import './index.less';

interface Props {
  todoStore: ETodoStore;
  labelsStore: ELabelStore;
}

@inject('labelsStore', 'todoStore')
@observer
class TodoContainer extends React.Component<Props, {}> {
  input: HTMLInputElement;

  handleClick = () => {
    const { todoStore } = this.props;
    todoStore.addTodo(this.input.value);
  };

  handleSelectStatus = () => {
    const { todoStore } = this.props;
    todoStore.changeStatus();
  };

  handleSelectLabel = e => {
    const { todoStore } = this.props;
    todoStore.changeLabel(Number(e.target.value));
  };

  handleSelectOk = i => {
    return () => {
      const { todoStore } = this.props;
      todoStore.changeTodoStatus(i);
    };
  };

  handleSelectDele = key => {
    return () => {
      const { todoStore } = this.props;
      todoStore.deleTodo(key);
    };
  };

  render() {
    const { todoStore, labelsStore } = this.props;
    return (
      <div className="todo">
        <div className="todo_operation">
          <select
            value={labelsStore[todoStore.currentLabel]}
            onChange={this.handleSelectLabel}
          >
            {labelsStore.labels.map((item, i) => (
              <option value={i} key={item.time}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={todoStore.currentStatus}
            onChange={this.handleSelectStatus}
          >
            <option value="true">完成</option>
            <option value="false">未完成</option>
          </select>
        </div>
        <input
          ref={input => {
            this.input = input;
          }}
        />
        <button onClick={this.handleClick}>add</button>
        <div className="todo_list">
          <ul>
            {todoStore.getFilterList.map(item => (
              <li key={item.key}>
                <div
                  style={{
                    textDecoration: item.status ? 'line-through' : 'none'
                  }}
                >
                  {item.text}
                </div>
                <div>
                  <span onClick={this.handleSelectOk(item.key)}>ok</span>&nbsp;&nbsp;
                  <span onClick={this.handleSelectDele(item.key)}>dele</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoContainer;
