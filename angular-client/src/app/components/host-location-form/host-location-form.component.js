import {template} from './host-location-form.es6';

export const HostLocationFormComponent = {
  bindings:{
    checkAction: "&",
    refreshFlag: "<"
  },
  template,
  controller: class HostLocationFormController{
    constructor($scope, $log, HostLocationService, LocationService, ModalService){
      'ngInject';

      this.$log = $log;
      this.$scope = $scope;
      this.HostLocationService = HostLocationService;
      this.LocationService = LocationService;
      this.ModalService = ModalService;
      this.host_location = {
        location:{}
      };

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if (d.name=="state-selector-modal" && d.state=="confirmed"){
          this.host_location.location.state = d.data.code;
        }
      });

      // let createLocationEvent = $scope.$on("create-location-event", (e,d)=>{
      //   this.host_location.location = d;
      //   this.host_location.location_id = d.id;
      //   HostLocationService.create(this.host_location);
      // });

      let createHostLocationEvent = $scope.$on("create-host-location-event", ()=>{
        this.host_location = {
          location: {}
        };
        $scope.newLocationForm.$setUntouched();
      })
      //
      $scope.$on("$destroy", createHostLocationEvent);
      // $scope.$on("$destroy", createLocationEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {

    }

    $onChanges(changes){
      // this.$log.log(changes);
      if( !changes.refreshFlag.currentValue ){
        this.host_location = {
          location:{}
        }
        if( this.$scope.newLocationForm ){
          this.$scope.newLocationForm.$setUntouched();
        }
      }
    }


    addLocation(){
      this.LocationService.create(this.host_location.location);
    }

    openStateSelector(){
      this.ModalService.setModalState("open", "state-selector-modal");
    }


  }
}
