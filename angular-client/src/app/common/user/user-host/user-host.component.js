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
      ModalService){

      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.HostService = HostService;
      this.HostLocationService = HostLocationService;
      this.ModalService = ModalService;
      this.newLocation = {};
      this.host = {};

      let hostCreateEvent = $scope.$on("host-create-event", (e,d)=>{
        this.host = d;
        $log.log("UserHostComponent.constructor",d);
        HostLocationService.create(this.newLocation)
      });

      let hostLocationCreateEvent = $scope.$on("create-host-location-event", ()=>{
        this.newLocation = {};
      });

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if (d.name=="state-selector-modal" && d.state=="confirmed"){
          this.newLocation.state = d.data.code;
        }
      });

      $scope.$on("$destroy", hostCreateEvent);
      $scope.$on("$destroy", hostLocationCreateEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      this.host.taster = this.taster;
      this.host.taster_id = this.taster.id;
      this.host.connections = [];
    }

    addHostLocation(){
      // this.$log.log(this.host);
      if( this.host.id ){
        this.HostLocationService.create(this.newLocation);
      }else{
        this.HostService.create(this.host);

      }
    }

    openStateSelector(){
      this.ModalService.setModalState("open", "state-selector-modal");
    }


  }
}
