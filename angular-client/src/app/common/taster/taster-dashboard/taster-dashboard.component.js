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
      this.TasterService = TasterService;
      // this.taster = null;

    }

    $onInit() {

      // this.$log.log("TasterDashboardComponent: onInit", this.taster);
      // if( this.data.success ){
      //   this.taster = this.data.taster;
      // }else{
      //   this.$state.go('welcome');
      // }
    }

  }
}
