import {template} from './taster-dashboard.es6';

export const TasterDashboardComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterDashboardComponent{
    constructor($scope, $log, $state, TasterService, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        // this.$log.log("TasterDashboardComponent: tasterChangeEvent", d);
        this.taster = d;
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        // this.$log.log("TasterDashboardComponent: userChangeEvent", d);
        if( d ){
          TasterService.loadTasterFromUser(d.id);
        }else{
          // this.$log.log("TasterDashboardComponent: changing state");
          $state.go('welcome');
        }
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
      
    }

    $onInit() {
      this.$log.log("TasterDashboardComponent: onInit", this.UserService.validationState());
      if( this.UserService.validationState()=="unvalidated" ){
        this.$state.go('welcome');
      }
    }

  }
}
