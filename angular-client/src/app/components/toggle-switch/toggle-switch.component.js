import {template} from './toggle-switch.es6';

export const ToggleSwitchComponent = {
  bindings: {
    toggleTrigger: "&",
    toggleState: "<",
    toggleLabel: "<"
  },
  template,
  controller: class ToggleSwitchController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("TastingListItemComponent $onInit");
    }



  }
}
