import {template} from './welcome-signup.es6';


export const WelcomeSignupComponent = {
  template,
  controller: class WelcomeSignupComponent{
    constructor($scope, $state, $log, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;
      this.TasterService = TasterService;
      this.state = "user";

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        if( d ) {
          this.user = d;
          this.state = "taster";
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
      if( this.UserService.validationState()=="user_set" ){
        this.TasterService.loadTasterFromUser(this.UserService.getUser().id);
      }
    }

    signupInvalid(form){
      return form.$invalid || this.user.password != this.user.password_confirmation;
    }

    signupUser(){
      this.UserService.signupUser(this.user);
    }

    signupTaster(){
      this.taster.user_id = this.user.id;
      this.TasterService.signupTaster(this.taster);
    }

  }
}
