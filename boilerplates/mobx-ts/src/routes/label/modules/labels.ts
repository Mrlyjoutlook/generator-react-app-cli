import { observable, action, useStrict } from 'mobx';

useStrict(true);

class LabelsStore {
  rootStore: object;

  @observable labels = [];

  constructor(rootStore: object) {
    this.rootStore = rootStore;
  }

  @action
  addLabel(name: string) {
    this.labels.push({
      time: new Date().getTime(),
      name
    });
  }
}

export interface ELabelStore extends LabelsStore {}

export default LabelsStore;
