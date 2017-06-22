import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  template,
  controller: class WelcomeSigninController{
    constructor($scope, $log, $state, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        if( d ) this.$state.go('dashboard');
      });

      $scope.$on('$destroy', userChangeEvent);
    }

    $onInit() {
      this.$log.log("WelcomeSigninComponent $onInit");
    }

    signinUser(){

      this.UserService.signinUser(this.user);
    }

  }
}
