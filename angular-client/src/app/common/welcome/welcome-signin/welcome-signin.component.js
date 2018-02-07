import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeSigninComponent{
    constructor($location, $log, $scope, $state, UserService, AlertsService){
      'ngInject';
      this.redirect_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/user/password/reset";
      this.$log = $log;
      this.$state = $state;
      this.$scope = $scope;
      this.AlertsService = AlertsService
      this.UserService = UserService;
      this.viewState = 1;
      this.wait = false;
    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }else{
        this.user = {};
      }
      // this.$log.log("WelcomeSigninComponent.$onInit", this.$scope);
    }

    signinUser(){
      this.UserService.signinUser(this.user)
        .then(() => {
          this.$state.go('dashboard');
        })
        .catch(err => {
          this.AlertsService.setFailureAlert("Unable to sign in. Please try later.");
        })
    }

    requestPasswordReset(){
      this.wait = true;
      this.UserService.requestPasswordReset({email: this.user.email, redirect_url: this.redirect_url})
        .then(()=>{
          this.viewState = 3;
        })
        .catch(err=>{
          this.AlertsService.setFailureAlert("Um, we had a problem finding that email. Try again?");
        })
        .finally(()=>{
          this.wait = false;
        })
    }

    resetUserPassword(){
      this.wait = true;
      this.UserService.resetUserPassword(this.user)
        .then(()=>{
          this.user = null;
          this.viewState = 1;
        })
        .catch(err=>{
          this.AlertsService.setFailureAlert("Unable to update password. Please try later.");
        })
        .finally(()=>{
          this.wait = false;
        })
    }

  }
}
