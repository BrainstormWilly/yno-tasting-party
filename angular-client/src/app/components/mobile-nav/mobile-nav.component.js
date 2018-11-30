import {template} from './mobile-nav.es6';

export const MobileNavComponent = {
  template,
  controller: class MobileNavController{
    constructor($scope, $log, $state, UserService){
      'ngInject';
      this.$scope = $scope;
      this.$log = $log;
      this.$state = $state;
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

    newTasting(){
      if( this.signedIn && this.signedIn.host )
        this.$state.go("tasting-new")
      else {
        this.$state.go("user-host")
      }
    }

    signoutUser(){
      this.UserService.signoutUser();
    }

    backgroundClick(){
      if( this.navOn ) this.navOn = false;
    }

  }

}
