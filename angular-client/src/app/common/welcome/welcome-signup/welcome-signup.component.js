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
        .then(taster=>{
          this.taster = taster;
          this.viewState = 2;
        });
    }

    signupTaster(){
      this.TasterService.signupTaster(this.taster);
    }

  }
}
