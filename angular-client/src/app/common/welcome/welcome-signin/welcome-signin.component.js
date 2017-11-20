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

    }

    signinUser(){
      this.UserService.signinUser(this.user)
        .then(() => {
          this.$state.go('taster-dashboard');
        })
        .catch(err => {
          this.$log.error(err);
        })
    }

  }
}
