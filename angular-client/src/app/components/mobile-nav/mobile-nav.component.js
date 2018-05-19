import {template} from './mobile-nav.es6';

export const MobileNavComponent = {
  bindings:{
    signedIn: "<"
  },
  template,
  controller: class MobileNavController{
    constructor($scope, $log, UserService){
      'ngInject';
      this.$scope = $scope;
      this.$log = $log;
      this.UserService = UserService;
    }

    signoutUser(){
      this.UserService.signoutUser();
    }

  }

}
