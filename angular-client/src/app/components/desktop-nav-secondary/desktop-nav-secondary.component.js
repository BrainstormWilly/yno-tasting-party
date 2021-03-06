import {template} from './desktop-nav-secondary.es6';

export const DesktopNavSecondaryComponent = {
  bindings:{
    welcomeState: "<"
  },
  template,
  controller: class DesktopNavSecondaryController{
    constructor($state, $log, welcomeConstants, UserService){
      'ngInject';
      this.$state = $state;
      this.$log = $log;
      this.constants = welcomeConstants;
      this.UserService = UserService;
      this.signedIn = null;
    }

    $onInit(){
      let promise = this.UserService.getUserByValidation();
      promise.then(data=>{
        // this.$log.log(data);
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


  }

}
