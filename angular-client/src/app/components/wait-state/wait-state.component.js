import {template} from './wait-state.es6';

export const WaitStateComponent = {
  bindings: {
    waitOn: "<"
  },
  template,
  controller: class WaitStateController{
    constructor($log, $element, $scope){
      'ngInject';
      this.$log = $log;
      this.$element = $element;

      let serviceCompleteEvent = $scope.$on("service-complete-event", ()=>{
        this.waitOn = false;
      });

      let serviceInitEvent = $scope.$on("service-init-event", ()=>{
        this.waitOn = true;
      });

      $scope.$on("$destroy", serviceCompleteEvent);
      $scope.$on("$destroy", serviceInitEvent);
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
