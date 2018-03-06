import LabelsStore from '../routes/label/modules/labels';
import TodoStore from '../routes/todo/modules/todo';

class Store {
  constructor() {
    this.labelsStore = new LabelsStore(this);
    this.todoStore = new TodoStore(this);
  }

  injectStore(key, value) {
    if (!(key in value)) {
      this[key] = value;
    }
  }
}

export default Store;
