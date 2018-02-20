import {template} from './user-host.es6';

export const UserHostComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class UserHostController{
    constructor($scope, $log, $state,
      HostService,
      HostLocationService,
      LocationService){

      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.HostService = HostService;
      this.LocationService = LocationService;
      this.newHostLocation = null;
      this.newHostLocationInvalid = true;
      this.host = {};

      let hostCreateEvent = $scope.$on("host-create-event", (e,d)=>{
        this.host = d;
        // $log.log("UserHostComponent.constructor",d);
        LocationService.create(this.newHostLocation.location);
      });

      let createLocationEvent = $scope.$on("create-location-event", (e,d)=>{
        this.newHostLocation.location_id = d.id;
        HostLocationService.create(this.newHostLocation);
      });

      let hostLocationCreateEvent = $scope.$on("create-host-location-event", ()=>{
        this.newHostLocation = null;
        this.$state.go("tasting-new");
      });

      // let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
      //   if (d.name=="state-selector-modal" && d.state=="confirmed"){
      //     this.newHostLocation.location.state = d.data.code;
      //   }
      // });

      $scope.$on("$destroy", createLocationEvent);
      $scope.$on("$destroy", hostCreateEvent);
      $scope.$on("$destroy", hostLocationCreateEvent);
      // $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      if( this.taster.is_host ){
        this.$state.go("tasting-new");
      }else{
        this.host.taster = this.taster;
        this.host.taster_id = this.taster.id;
        this.host.connections = [];
      }
    }

    addHostLocation(){
      // this.$log.log(this.host);
      if( this.host.id ){
        this.LocationService.create(this.newHostLocation.location);
      }else{
        this.HostService.create(this.host);
      }
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

    // openStateSelector(){
    //   this.ModalService.setModalState("open", "state-selector-modal");
    // }


  }
}
