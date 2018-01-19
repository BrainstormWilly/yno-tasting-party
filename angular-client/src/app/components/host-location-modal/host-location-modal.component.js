import {template} from './host-location-modal.es6';

export const HostLocationModalComponent = {
  bindings: {
    hostLocations: "<"
  },
  template,
  controller: class HostLocationModalController{
    constructor($scope, $log, $element, ModalService, HostLocationService){
      'ngInject';

      this.$log = $log;
      this.$element = $element;
      this.name = "host-location-modal";
      this.ModalService = ModalService;
      this.HostLocationService = HostLocationService;
      this.modalState = "closed";
      this.selected_host_location = null;
      // this.new_location = {};
      this.state = 1;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if( d.name==this.name ){
          this.modalState = d.state;
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      let createHostLocationEvent = $scope.$on("create-host-location-event", (e,d)=>{
        // this.new_location = {};
        this.selected_host_location = d;
        this.state = 1;
        this.confirmModal();
      });

      $scope.$on("$destroy", createHostLocationEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
      // this.$log.log(this.hostLocations);
      if( this.hostLocations ){
        for( let i=0; i<this.hostLocations.length; i++ ){
          if( this.hostLocations[i].selected ){
            this.selected_host_location = this.hostLocations[i];
            break;
          }
        }
      }
    }

    // openStateSelector(){
    //   this.ModalService.setModalState("open", "state-selector-modal");
    // }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.selected_host_location);
    }

    // addLocation(){
    //   this.HostLocationService.create(this.new_location);
    // }

  }
}
