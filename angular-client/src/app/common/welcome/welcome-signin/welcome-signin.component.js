import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  template,
  controller: class WelcomeSigninController{
    constructor($scope, $log, $state, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        if( d ) {
          TasterService.loadTasterFromUser(d.id);
        }
      });

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        if( d ) {
          this.$state.go('taster-dashboard', {id: d.id});
        }
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
    }

    $onInit() {
      // this.$log.log("WelcomeSigninComponent $onInit");
    }

    signinUser(){
      this.UserService.signinUser(this.user);
    }

  }
}
