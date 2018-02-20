import {template} from './tasting-show.es6';

export const TastingShowComponent = {
  bindings:{
    taster: "<",
    tasting: "<",
    tasterIsHost: "<"
  },
  template,
  controller: class TastingShowController{
    constructor($scope, $log, $state,
      ModalService,
      NotificationsService,
      TastingService)
    {
      'ngInject';

      this.$log = $log;
      this.$state = $state;
      this.ModalService = ModalService;
      this.NotificationsService = NotificationsService;
      this.TastingService = TastingService;
      this.tasterNumber = 0;

      let modalStateChangeEvent = $scope.$on('modal-state-change-event', (e,d) => {
        if( d.state=="confirmed" && d.name=="tasting-detail-modal" ){
          this.tasting = d.data;
        }
      });

      $scope.$on("$destroy", modalStateChangeEvent);

    }

    $onInit(){
      if( this.tasterIsHost && this.tasting.host_is_not_tasting ){
        this.tasterNumber = 0;
      }else{
        for( let i=0; i<this.tasting.guests.length; i++ ){
          // this.$log.log("TastingShowComponent.$onInit", this.taster.id, this.tasting.guests[i]);
          if( this.taster.id==this.tasting.guests[i].taster_id ){
            this.tasterNumber = this.tasting.guests[i].taster_number;
            break;
          }
        }
      }

    }
  }
}
