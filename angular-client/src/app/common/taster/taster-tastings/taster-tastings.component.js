import {template} from './taster-tastings.es6';

export const TasterTastingsComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterTastingsController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.taster = null;
      this.tastings = [];
      this.moment = moment;

      let tastingsChangeEvent = $scope.$on('taster-tastings-change-event', (e,d) => {
        this.tastings = d;
      });

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        this.taster = d;
        TasterService.loadTastings(d.id);
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        TasterService.loadTasterFromUser(d.id);
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tastingsChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
    }

    $onInit() {
      if( this.taster ){
        this.TasterService.loadTastings(this.taster.id);
      }
    }

    openDate(tasting){
      if( tasting.is_open ) return "Open Now!"
      return this.moment(tasting.open_at).format("M-D-GG");
    }

    openTime(tasting){
      if( tasting.is_open ) return ""
      return this.moment(tasting.open_at).format("h:mm a");
    }

    openDay(tasting){
      if( tasting.is_open ) return ""
      return this.moment(tasting.open_at).format("dddd");
    }

  }
}
