import {template} from './welcome-signup.es6';


export const WelcomeSignupComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeSignupComponent{
    constructor($scope, $state, $log, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;
      this.TasterService = TasterService;
      this.viewState = 1;
      this.taster = null;
    }

    $onInit() {
      if( this.user ){
        this.$state.go('dashboard');
      }
    }

    signupInvalid(form){
      return form.$invalid || this.user.password != this.user.password_confirmation;
    }

    signupUser(){
      this.UserService.signupUser(this.user)
        .then(response => {
          if( response.data.status=="success" ){
            this.taster = {
              user_id: response.data.data.id,
              user: response.data.data
            }
            this.viewState = 2;
          }else{
            this.$log.error("UserService.signupUser.signupUser", response.data.data);
          }
        })
        .catch(error => {
          this.$log.error("UserService.signupUser", error);
        })
    }

    signupTaster(){
      this.TasterService.signupTaster(this.taster);
    }

  }
}
