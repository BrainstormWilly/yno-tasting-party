import {template} from './welcome.es6';

export const WelcomeComponent = {
  bindings: {
    $transition$: '<'
  },
  template,
  controller: class WelcomeController{
    constructor($rootScope, $log, $state, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.UserService = UserService;

      let validationSuccess = $rootScope.$on('auth:validation-success', () => {
        this.$state.go('dashboard');
      });

      // $rootScope.$on('auth:validation-error', () => {
      //   this.$log.log('validation-error');
      // });
      //
      // $rootScope.$on('auth:session-expired', () => {
      //   this.$log.log('session-expired');
      // });
      //
      // $rootScope.$on('auth:invalid', () => {
      //   this.$log.log('session-expired');
      // });

      $rootScope.$on('$destroy', validationSuccess);

    }

    $onInit() {
      this.$log.log("WelcomeComponent $onInit");
      // this.UserService.validateUser();
    }

  }
}
