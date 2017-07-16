import {template} from './progress-bar.es6';

export const ProgressBarComponent = {
  bindings: {
    value: "<",
    direction: "@",
    labelSize: "<"
  },
  template,
  controller: class ProgressBarController{
    constructor($log){
      'ngInject';
      this.$log = $log;

    }

    $onInit() {
      this.$log.log("ProgressBarComponent $onInit");
      this.progress_bar_direction = "right";
      this.progress_label_placement = "middle";
    }

  }
}
