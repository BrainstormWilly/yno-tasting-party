import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeSigninComponent{
    constructor($location, $log, $scope, $state, lodash, welcomeConstants, UserService, AlertsService){
      'ngInject';
      this.redirect_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/user/password/reset";
      this.$location = $location;
      this.$log = $log;
      this.$state = $state;
      this.$scope = $scope;
      this._ = lodash;
      this.constants = welcomeConstants;
      this.AlertsService = AlertsService;
      this.UserService = UserService;
      this.subtitle = this.constants.SIGNIN_SUBTITLE;
      this.copy = this.constants.SIGNIN_COPY;
      this.wait = false;
    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }else{
        this.user = {};
      }

      // this.$log.log(this.$location.path().indexOf('alexa'));

      if( this.$location.path().indexOf('alexa') > -1 ){
        this.subtitle = this.constants.SIGNIN_ALEXA_SUBTITLE;
        this.copy = this.constants.SIGNIN_ALEXA_COPY;
      }
      // this.$log.log("WelcomeSigninComponent.$onInit", this.user);
    }

    // setViewState(state){
    //   switch(state){
    //     case 3:
    //     case 2:
    //       this.viewState = state;
    //       break;
    //     default:
    //       this.user = {};
    //       this.viewState = 1;
    //   }
    // }

    signinUser(){
      this.UserService.signinUser(this.user)
        .then(() => {
          this.$state.go('dashboard');
        })
        .catch(() => {
          this.AlertsService.setFailureAlert("Unable to sign in. Please check your email and password.");
        })
        .finally(()=>{
          this.wait = false; // for resetUserPassword completion
        })
    }

    // requestPasswordReset(){
    //   this.wait = true;
    //   this.UserService.requestPasswordReset({email: this.user.email, redirect_url: this.redirect_url})
    //     .then(()=>{
    //       this.setViewState(3);
    //     })
    //     .catch(()=>{
    //       this.AlertsService.setFailureAlert("Um, we had a problem finding that email. Try again?");
    //     })
    //     .finally(()=>{
    //       this.wait = false;
    //     })
    // }
    //
    // resetUserPassword(){
    //   this.wait = true;
    //   this.UserService.resetUserPassword(this.user)
    //     .then(result=>{
    //       // this.$log.log(result);
    //       this.user.email = result.data.email;
    //       this.signinUser();
    //       this.setViewState();
    //     })
    //     .catch(()=>{
    //       this.wait = false;
    //       // this.$log.error("WelcomeSigninComponent.resetUserPassword", err);
    //       this.AlertsService.setFailureAlert("Unable to update password. Please try later.");
    //     })
    // }

  }
}
