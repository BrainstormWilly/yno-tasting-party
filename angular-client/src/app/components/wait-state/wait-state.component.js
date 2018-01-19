import {template} from './wait-state.es6';

export const WaitStateComponent = {
  bindings: {
    waitOn: "<"
  },
  template,
  controller: class WaitStateController{
    constructor($log, $element){
      'ngInject';
      this.$log = $log;
      this.$element = $element;
    }

    $onInit() {

    }

    $onChanges(changeObj){
      // this.$log.log("WaitStateComponent.$onChanges", changeObj);
      if( changeObj.waitOn ){
        if( changeObj.waitOn.currentValue ){
          this.$element.css("visibility", "visible");
        }else{
          this.$element.css("visibility", "hidden");
        }
      }
    }

  }


}
