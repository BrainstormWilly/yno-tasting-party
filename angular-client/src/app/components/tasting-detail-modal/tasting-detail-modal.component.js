import {template} from './tasting-detail-modal.es6';

export const TastingDetailModalComponent = {
  bindings:{
    tasting: "<",
    updateTastingDetails: "&"
  },
  template,
  controller: class TastingDetailModalController{
    constructor($scope, $log, $element, $rootScope, ModalService, TastingService){
      'ngInject';
      this.$log = $log;
      this.name = "tasting-detail-modal";
      this.ModalService = ModalService;
      this.TastingService = TastingService;
      this.modalState = "closed";
      this.pending_tasting = {};
      this.tasting_open_at = null;
      this.tasting_close_at = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.pending_tasting = {};
            this.tasting_open_at = null;
            this.tasting_close_at = null;
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }else if (d.name=="host-location-modal") {
          if( d.state!="open" ){
            this.pending_tasting.location = d.data.location;
            this.pending_tasting.location_id = d.data.location.id;
          }
        }
      });

      let updateTastingEvent = $scope.$on("update-tasting-event", (e,d)=>{
        this.pending_tasting = d;
        this.confirmModal()
      });

      $scope.$on("destroy", modalStateChangeEvent);
      $scope.$on("destroy", updateTastingEvent);
    }

    $onInit() {
      // this.$log.log(this.tasting);
      this.ModalService.registerModal(this);
      this.pending_tasting = angular.copy(this.tasting);
      this.pending_tasting.open_at = moment(this.tasting.open_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
      if( this.tasting.close_at ){
        this.pending_tasting.close_at = moment(this.tasting.open_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
      }
      for( let i=0; i<this.pending_tasting.host.locations.length; i++){
        if( this.pending_tasting.host.locations[i].location.id==this.pending_tasting.location.id ){
          this.pending_tasting.host.locations[i].selected = true;
          break;
        }
      }
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirm", this.name, this.pending_tasting);
    }

    updateTasting(){
      this.pending_tasting.open_at = this.pending_tasting.open_at.utc();
      if( this.pending_tasting.close_at ){
        this.pending_tasting.close_at = this.pending_tasting.close_at.utc();
      }
      this.TastingService.updateTasting(this.pending_tasting);
    }

    openHostLocationModal(){
      this.ModalService.setModalState("open", "host-location-modal");
    }

    // createWine(){
    //   this.WineService.createWine({wine:this.wine})
    //     .then(result=>{
    //       this.tastingWine = {};
    //       this.confirmModal(result.data);
    //     })
    //     .catch(err=>{
    //       this.$log.error(err);
    //     });
    // }

  }
}
