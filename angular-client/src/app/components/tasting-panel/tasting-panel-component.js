import {template} from './tasting-panel.es6';

export const TastingPanelComponent = {
  bindings: {
    taster: "<",
    tasting: "<",
    editable: "<"
  },
  template,
  controller: class TastingPanelController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

  }
}
