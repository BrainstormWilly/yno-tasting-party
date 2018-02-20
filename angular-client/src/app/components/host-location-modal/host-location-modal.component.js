import {template} from './host-location-modal.es6';

export const HostLocationModalComponent = {
  bindings: {
    hostLocations: "<",
    selectedLocation: "<"
  },
  template,
  controller: class HostLocationModalController{
    constructor($scope, $log, $element, lodash, HostLocationService, LocationService, ModalService){
      'ngInject';

      this.$log = $log;
      this.$element = $element;
      this._ = lodash;
      this.name = "host-location-modal";
      this.HostLocationService = HostLocationService;
      this.LocationService = LocationService;
      this.ModalService = ModalService;
      this.modalState = "closed";
      // this.selected_host_location = null;
      // this.new_location = {};
      this.viewState = 1;
      this.newHostLocation = null;
      this.newHostLocationInvalid = true;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if( d.name==this.name ){
          this.modalState = d.state;
          if( d.state=="open" ){
            // this.$log.log("HostLocationModalComponent.$onInit", this.selectedLocation);
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      let createHostLocationEvent = $scope.$on("create-host-location-event", ()=>{
        // this.new_location = {};
        // this.selected_host_location = d;
        this.viewState = 1;
        this.newHostLocation = null;
        this.newHostLocationInvalid = true;
        this.ModalService.setModalState("confirmed", this.name, this.selectedLocation);
      });

      let createLocationEvent = $scope.$on("create-location-event", (e,d)=>{
        // this.host_location.location = d;
        this.selectedLocation = d;
        this.newHostLocation.location_id = d.id;
        HostLocationService.create(this.newHostLocation);
      });

      $scope.$on("$destroy", createHostLocationEvent);
      $scope.$on("$destroy", createLocationEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);

      // this.$log.log(this.hostLocations);
      // if( this.hostLocations ){
      //   for( let i=0; i<this.hostLocations.length; i++ ){
      //     if( this.hostLocations[i].selected ){
      //       this.selected_host_location = this.hostLocations[i];
      //       break;
      //     }
      //   }
      // }
    }

    onNewHostLocationChange(host_location){
      let phonePtrn =/[0-9]{3}-*[0-9]{3}-*[0-9]{4}/;
      // this.$log.log(host_location.location.phone.match(phonePtrn));
      this.newHostLocation = host_location;
      if(
          host_location.location.phone &&
          host_location.location.phone.match(phonePtrn) &&
          host_location.location.address &&
          host_location.location.city &&
          host_location.location.state &&
          host_location.location.postal
      ){
        this.newHostLocationInvalid = false;
      }else{
        this.newHostLocationInvalid = true;
      }
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      if( this.viewState==2 ){
        this.LocationService.create(this.newHostLocation.location);
      }else{
        this.ModalService.setModalState("confirmed", this.name, this.selectedLocation);
      }
    }

    // addLocation(){
    //   this.HostLocationService.create(this.new_location);
    // }

  }
}
