import {template} from './welcome.es6';

export const WelcomeComponent = {
  template,
  controller: class WelcomeController{
    constructor($scope, $log, $state, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.review_mode = false;
      this.UserService = UserService;

      let validationSuccess = $scope.$on('auth:validation-success', () => {
        $log.log('WelcomeComponent: validationSuccess');
        this.$state.go('dashboard');
      });

      $scope.$on('$destroy', validationSuccess);

    }

    $onInit() {
      this.$log.log("WelcomeComponent $onInit");
    }

    
  }
}
