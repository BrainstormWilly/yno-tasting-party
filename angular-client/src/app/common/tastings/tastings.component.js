import {template} from './tastings.es6';

export const TastingsComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TastingsController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.tastings = [];

      let tastingsChangeEvent = $scope.$on('taster-tastings-change-event', (e,d) => {
        if( d ){
          this.tastings = d;
        }else{
          this.$state.go('dashboard');
        }
      });

      $scope.$on('$destroy', tastingsChangeEvent);
    }

    $onInit() {
      this.$log.log("TastingsComponent $onInit");
      this.TasterService.loadTastings(this.taster.id)
    }

  }
}
