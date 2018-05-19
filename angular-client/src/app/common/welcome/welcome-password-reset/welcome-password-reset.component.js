import {template} from './welcome-password-reset.es6';


export const WelcomePasswordResetComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomePasswordResetController{
    constructor($location, $log, $scope, $state, lodash, welcomeConstants, UserService, AlertsService){
      'ngInject';
      this.redirect_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/user/password/reset";
      this.$location = $location;
      this.$log = $log;
      this.$state = $state;
      this.$scope = $scope;
      this._ = lodash;
      this.constants = welcomeConstants;
      this.AlertsService = AlertsService
      this.UserService = UserService;
      this.subtitle = welcomeConstants.PASSWORD_REQUEST_SUBTITLE;
      this.copy = welcomeConstants.PASSWORD_REQUEST_COPY;
      this.wait = false;
    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }else{
        this.setViewState();
      }
    }

    setViewState(state){
      switch(state){
        case 2:
          this.subtitle = this.constants.PASSWORD_RESET_SUBTITLE;
          this.copy = this.constants.PASSWORD_RESET_COPY;
          this.viewState = state;
          break;
        default:
        this.subtitle = this.constants.PASSWORD_REQUEST_SUBTITLE;
        this.copy = this.constants.PASSWORD_REQUEST_COPY;
          this.user = {};
          this.viewState = 1;
      }
    }

    requestPasswordReset(){
      this.wait = true;
      this.UserService.requestPasswordReset({email: this.user.email, redirect_url: this.redirect_url})
        .then(()=>{
          this.setViewState(2);
        })
        .catch(()=>{
          this.AlertsService.setFailureAlert("Um, we had a problem finding that email. Try again?");
        })
        .finally(()=>{
          this.wait = false;
        })
    }

    resetUserPassword(){
      this.wait = true;
      this.UserService.resetUserPassword(this.user)
        .then(result=>{
          // this.$log.log(result);
          this.user.email = result.data.email;
          this.UserService.signinUser(this.user)
            .then(() => {
              this.$state.go('dashboard');
            })
            .catch(() => {
              this.AlertsService.setFailureAlert("Unable to sign in. Please check your email and password.");
            })
            .finally(()=>{
              this.wait = false; // for resetUserPassword completion
              this.setViewState();
            })

        })
        .catch(()=>{
          this.wait = false;
          // this.$log.error("WelcomeSigninComponent.resetUserPassword", err);
          this.AlertsService.setFailureAlert("Unable to update password. Please try later.");
        })
    }

  }
}
