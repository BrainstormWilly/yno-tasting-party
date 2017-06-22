import {template} from './dashboard.es6';

export const DashboardComponent = {
  bindings: {
    user: "<"
  },
  template,
  controller: class DashboardController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.taster = null;

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        // this.$log.log("TasterService", d);
        if( d ){
          this.taster = d;
        }else{
          this.$state.go('welcome');
        }
      });

      $scope.$on('$destroy', tasterChangeEvent);
    }

    $onInit() {
      this.$log.log("DashboardComponent $onInit");
      this.TasterService.loadTaster(this.user.id)
    }

  }
}
