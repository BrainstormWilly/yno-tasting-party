import {template} from './tasting-detail-modal.es6';

export const TastingDetailModalComponent = {
  bindings:{
    tasting: "<"
  },
  template,
  controller: class TastingDetailModalController{
    constructor($scope, $log, $element, $rootScope, lodash, ModalService, TastingService){
      'ngInject';
      this.$log = $log;
      this._ = lodash;
      this.name = "tasting-detail-modal";
      this.ModalService = ModalService;
      this.TastingService = TastingService;
      this.modalState = "closed";
      this.pending_tasting = {};
      this.minCloseDate = moment();
      this.wait = false;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            /* because the dates are in inputs we can't use filters to display local date/times */
            this.pending_tasting = angular.copy(this.tasting);
            this.pending_tasting.open_at = moment(this.tasting.open_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
            if( this.tasting.close_at ) this.pending_tasting.close_at = moment(this.tasting.close_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
            if( this.tasting.closed_at ) this.pending_tasting.closed_at = moment(this.tasting.closed_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
            // this.$log.log("TastingDetailModalComponent", this.pending_tasting);
            // for( let i=0; i<this.pending_tasting.host.locations.length; i++){
            //   if( this.pending_tasting.host.locations[i].location.id==this.pending_tasting.location.id ){
            //     this.selectedLocation =
            //     this.pending_tasting.host.locations[i].selected = true;
            //     break;
            //   }
            // }
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.pending_tasting = {};
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }else if (d.name=="host-location-modal") {
          if( d.state=="confirmed" ){
            this.pending_tasting.location = d.data;
            this.pending_tasting.location_id = d.data.id;
          }
        }
      });

      let createHostLocationEvent = $scope.$on("create-host-location-event", (e,d)=>{
        if( d.primary ){
          this._.forEach(this.pending_tasting.host.locations, (v)=>{
            v.primary = false;
          });
        }
        this.pending_tasting.host.locations.push(d);
      });

      let updateTastingEvent = $scope.$on("update-tasting-event", (e,d)=>{
        this.wait = false;
        this.pending_tasting = d;
        this.confirmModal()
      });

      $scope.$on("destroy", modalStateChangeEvent);
      $scope.$on("destroy", createHostLocationEvent);
      $scope.$on("destroy", updateTastingEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirm", this.name, this.pending_tasting);
    }

    // minCloseDate(){
    //   return moment(this.pending_tasting.open_at).isBefore(moment()) ? moment() : this.pending_tasting.open_at;
    // }

    updateTasting(){
      this.wait = true;
      // this.pending_tasting.open_at = this.pending_tasting.open_at.utc();
      // if( this.pending_tasting.close_at ) this.pending_tasting.close_at = this.pending_tasting.close_at.utc();
      // if( this.pending_tasting.closed_at ) this.pending_tasting.closed_at = this.pending_tasting.closed_at.utc();
      // this.$log.log("TastingDetailModalComponent.updateTasting");
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
