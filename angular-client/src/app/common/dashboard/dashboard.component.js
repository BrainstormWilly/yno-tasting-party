import {template} from './dashboard.es6';

export const DashboardComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class DashboardController{
    constructor($scope, $log, $state, welcomeConstants, TasterService, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
      this.UserService = UserService;
      this.TasterService = TasterService;
      // this._ = _;
      // this.taster = null;

    }

    $onInit() {
      // this.$log.log("DashboardComponent.$onInit");
    }

  }
}
