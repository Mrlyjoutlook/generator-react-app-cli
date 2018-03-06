import { observable, action, computed, useStrict } from 'mobx';

useStrict(true);

class TodoStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable list = [];
  @observable currentLabel = 0;
  @observable currentStatus = false;

  @computed
  get getFilterList() {
    return this.list.filter(
      item => item.status === this.currentStatus && item.label === this.currentLabel,
    );
  }

  @action
  addTodo(text) {
    this.list.push({
      key: new Date().getTime(),
      label: this.currentLabel,
      text,
      status: false,
    });
  }

  @action
  changeTodoStatus(k) {
    for (let i = 0; i < this.list.length; i += 1) {
      const { key } = this.list[i];
      if (key === k) {
        this.list[i].status = !this.list[i].status;
      }
    }
  }

  @action
  changeStatus() {
    this.currentStatus = !this.currentStatus;
  }

  @action
  changeLabel(t) {
    this.currentLabel = t;
  }

  @action
  deleTodo(k) {
    for (let i = 0; i < this.list.length; i += 1) {
      const { status, label, key } = this.list[i];
      if (status === this.currentStatus && label === this.currentLabel && key === k) {
        this.list.splice(i, 1);
      }
    }
  }
}

export default TodoStore;
