import {template} from './sort-bar.es6';

export const SortBarComponent = {
  bindings: {
    fields: "<",
    selectAction: "&"
  },
  template,
  controller: class SortBarController{
    constructor($log){
      'ngInject';
      this.$log = $log;

    }

    $onInit() {
      // this.progress_bar_direction = "right";
      // this.progress_label_placement = "middle";
    }

  }
}
