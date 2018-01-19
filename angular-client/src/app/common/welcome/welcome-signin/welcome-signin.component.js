import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeSigninComponent{
    constructor($log, $state, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;
    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }
    }

    signinUser(){
      this.UserService.signinUser(this.user)
        .then(() => {
          this.$state.go('dashboard');
        })
        .catch(err => {
          this.$log.error(err);
        })
    }

  }
}
