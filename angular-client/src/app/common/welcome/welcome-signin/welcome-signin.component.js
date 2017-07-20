import {template} from './welcome-signin.es6';


export const WelcomeSigninComponent = {
  template,
  controller: class WelcomeSigninComponent{
    constructor($scope, $log, $state, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;
      this.TasterService = TasterService;

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
      if( this.UserService.validationState()=="user_set" ){
        this.TasterService.loadTasterFromUser(this.UserService.getUser().id);
      }
    }

    signinUser(){
      this.UserService.signinUser(this.user);
    }

  }
}
