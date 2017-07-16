import {template} from './user.es6';

export const UserComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class UserController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;

      // let tastingsChangeEvent = $scope.$on('taster-tastings-change-event', (e,d) => {
      //   if( d ){
      //     this.tastings = d;
      //   }else{
      //     this.$state.go('dashboard');
      //   }
      // });
      //
      // $scope.$on('$destroy', tastingsChangeEvent);
    }

    $onInit() {
      this.$log.log("UserComponent $onInit");
    }

  }
}
