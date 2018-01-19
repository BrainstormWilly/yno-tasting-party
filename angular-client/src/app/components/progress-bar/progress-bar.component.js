import {template} from './progress-bar.es6';

export const ProgressBarComponent = {
  bindings: {
    value: "<"
  },
  template,
  controller: class ProgressBarController{
    constructor($log, $element){
      'ngInject';
      this.$log = $log;
      this.$track = $element.find(".track");

    }

    $onChanges(obj){
      TweenMax.to(this.$track, 1, {width: Math.ceil(100*obj.value.currentValue)+"%"});
    }

    $onInit() {
      // this.progress_bar_direction = "right";
      // this.progress_label_placement = "middle";
    }

  }
}
