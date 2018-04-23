import {template} from './desktop-nav-primary.es6';

export const DesktopNavPrimaryComponent = {
  bindings:{
    welcomeState: "<"
  },
  template,
  controller: class DesktopNavPrimaryController{
    constructor($scope, $log, $state, welcomeConstants){
      'ngInject';
      this.$scope = $scope;
      this.$state = $state;
      this.$log = $log;
      this.constants = welcomeConstants;
    }
  }
}
