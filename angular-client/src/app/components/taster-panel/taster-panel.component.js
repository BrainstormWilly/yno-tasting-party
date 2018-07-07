import {template} from './taster-panel.es6';

export const TasterPanelComponent = {
  bindings: {
    taster: "<",
    tasterNumber: "<"
  },
  template,
  controller: class TasterPanelController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

  }
}
