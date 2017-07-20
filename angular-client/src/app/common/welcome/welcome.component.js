import {template} from './welcome.es6';

export const WelcomeComponent = {
  template,
  controller: class WelcomeComponent{
    constructor($scope, $log, $state, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;

      // let validationSuccess = $scope.$on('auth:validation-success', (e,d) => {
      //   $log.log('WelcomeComponent: validationSuccess');
      //   TasterService.loadTasterFromUser(d.id)
      // });

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        if( d ){
          this.$state.go('taster-dashboard', {id: d.id});
        }
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        if( d ){
          TasterService.loadTasterFromUser(d.id)
        }
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);

    }

    $onInit() {
      // this.$log.log("WelcomeComponent $onInit");

    }


  }
}
