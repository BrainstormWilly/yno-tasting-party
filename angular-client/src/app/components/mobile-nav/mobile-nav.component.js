import {template} from './mobile-nav.es6';

export const MobileNavComponent = {
  template,
  controller: class MobileNavController{
    constructor($scope, $log, UserService){
      'ngInject';
      this.$scope = $scope;
      this.$log = $log;
      this.UserService = UserService;
      this.signedIn = null;
      this.navOn = false;
    }

    $onInit(){
      let promise = this.UserService.getUserByValidation();
      promise.then(data=>{
        this.signedIn = data;
      })
    }

    signoutUser(){
      this.UserService.signoutUser();
    }

    backgroundClick(){
      if( this.navOn ) this.navOn = false;
    }

  }

}
