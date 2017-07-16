import {template} from './taster-dashboard.es6';

export const TasterDashboardComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterDashboardController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        this.$log.log("tasterChangeEvent");
        this.taster = d;
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        this.$log.log("userChangeEvent");
        if( TasterService.getTaster() ){
          this.taster = TasterService.getTaster();
        }else{
          TasterService.loadTasterFromUser(d.id);
        }
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
      //
      // this.taster = TasterService.getTaster();
    }

    $onInit() {
      this.$log.log("TasterDashboardComponent $onInit");
    }

  }
}
