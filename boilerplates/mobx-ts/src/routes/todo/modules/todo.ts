import { observable, action, computed, useStrict } from 'mobx';

useStrict(true);

class TodoStore {
  rootStore: object;

  constructor(rootStore: object) {
    this.rootStore = rootStore;
  }

  @observable list = [];
  @observable currentLabel = 0;
  @observable _currentStatus = false;

  @computed
  get currentStatus() {
    if (this._currentStatus) {
      return 'true';
    } else {
      return 'false';
    }
  }

  @computed
  get getFilterList() {
    return this.list.filter(
      item =>
        item.status === this._currentStatus && item.label === this.currentLabel
    );
  }

  @action
  addTodo(text: string) {
    this.list.push({
      key: new Date().getTime(),
      label: this.currentLabel,
      text,
      status: false
    });
  }

  @action
  changeTodoStatus(k: string) {
    for (let i = 0; i < this.list.length; i += 1) {
      const { key } = this.list[i];
      if (key === k) {
        this.list[i].status = !this.list[i].status;
      }
    }
  }

  @action
  changeStatus() {
    this._currentStatus = !this._currentStatus;
  }

  @action
  changeLabel(t: number) {
    this.currentLabel = t;
  }

  @action
  deleTodo(k: string) {
    for (let i = 0; i < this.list.length; i += 1) {
      const { status, label, key } = this.list[i];
      if (
        status === this._currentStatus &&
        label === this.currentLabel &&
        key === k
      ) {
        this.list.splice(i, 1);
      }
    }
  }
}

export interface ETodoStore extends TodoStore {}

export default TodoStore;
