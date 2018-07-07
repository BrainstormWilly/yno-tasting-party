import {template} from './mobile-nav.es6';

export const MobileNavComponent = {
  bindings:{
    signedIn: "<",
    isHost: "<"
  },
  template,
  controller: class MobileNavController{
    constructor($scope, $log, UserService){
      'ngInject';
      this.$scope = $scope;
      this.$log = $log;
      this.UserService = UserService;
      this.navOn = false;
    }

    signoutUser(){
      this.UserService.signoutUser();
    }

    backgroundClick(){
      if( this.navOn ) this.navOn = false;
    }

  }

}
