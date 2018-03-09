import LabelsStore from '../routes/label/modules/labels';
import TodoStore from '../routes/todo/modules/todo';

class Store {
  labelsStore: object;
  todoStore: object;

  constructor() {
    this.labelsStore = new LabelsStore(this);
    this.todoStore = new TodoStore(this);
  }

  injectStore(key: string, value: object) {
    if (!(key in value)) {
      this[key] = value;
    }
  }
}

export default Store;
