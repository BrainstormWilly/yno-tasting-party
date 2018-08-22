import {template} from './user.es6';

export const UserComponent = {
  bindings: {
    user: "<"
  },
  template,
  controller: class UserController{
    constructor($scope, $log, $state,
      AlertsService,
      HostLocationService,
      LocationService,
      NotificationsService,
      TasterService,
      UserService){

      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.AlertsService = AlertsService;
      this.HostLocationService = HostLocationService;
      this.LocationService = LocationService;
      this.NotificationsService = NotificationsService;
      this.TasterService = TasterService;
      this.UserService = UserService;
      this.hostState = false;
      this.hostStateLabel = "Taster Profile";
      this.newHostLocation = null;
      this.newHostLocationInvalid = true;

      let endAlertsEvent = $scope.$on('end-alerts-event', (e,d)=>{
        if( d.action=='confirm' && d.code=='deactivateTaster' ){
          this.user.taster.status = "inactive";
          TasterService.update(this.user.taster);
        }
      });

      let userUpdateEvent = $scope.$on('user-update-event', (e,d) => {
        this.user.email = d.email;
        TasterService.update(this.user.taster);
      });

      let tasterUpdateEvent = $scope.$on("taster-update-event", (e,d)=>{
        this.user.taster = d;
        this.NotificationsService.setNotification("Profile update complete");
      });

      let createHostLocationEvent = $scope.$on("create-host-location-event", (e,d)=>{
        this.NotificationsService.setNotification("New location added");
        if( d.primary ){
          for( let i=0; i<this.user.host.locations.length; i++ ){
            this.user.host.locations[i].primary = false;
          }
        }
        this.user.host.locations.push(d);
      });

      let createLocationEvent = $scope.$on("create-location-event", (e,d)=>{
        // this.host_location.location = d;
        this.newHostLocation.location_id = d.id;
        HostLocationService.create(this.newHostLocation);
      });

      let destroyHostLocationEvent = $scope.$on("destroy-host-location-event", (e,d)=>{
        this.NotificationsService.setNotification("Location successfully removed");
        for( let i=0; i<this.user.host.locations.length; i++ ){
          if( this.user.host.locations[i].id==d.id ){
            this.user.host.locations.splice(i,1);
            break;
          }
        }
        if( d.primary ){
          this.user.host.locations[0].primary = true;
        }
      });

      let updateHostLocationEvent = $scope.$on("update-host-location-event", (e,d)=>{
        for( let i=0; i<this.user.host.locations.length; i++ ){
          if( this.user.host.locations[i].id==d.id ){
            this.user.host.locations[i].primary = true;
          }else{
            this.user.host.locations[i].primary = false;
          }
        }
      });

      $scope.$on('$destroy', endAlertsEvent);
      $scope.$on('$destroy', createHostLocationEvent);
      $scope.$on('$destroy', createLocationEvent);
      $scope.$on('$destroy', destroyHostLocationEvent);
      $scope.$on('$destroy', updateHostLocationEvent);
      $scope.$on('$destroy', userUpdateEvent);
      $scope.$on('$destroy', tasterUpdateEvent);
    }

    $onInit() {
      // this.$log.log("UserComponent $onInit", this.user);
    }

    activateTaster(){
      this.user.taster.status = "active";
      this.TasterService.update(this.user.taster);
    }

    addLocation(){
      this.LocationService.create(this.newHostLocation.location);
    }

    attemptDeactivateTaster(){
      // this.$log.log("UserComponent.attemptDeactivateTaster");
      this.AlertsService.setWarningAlert(
        "Are you sure you want to deactivate your account? You will no longer receive invites nor be able to host tastings. You will remain active in tastings are currently involved with.",
        "deactivateTaster",
        this.user.taster
      )
    }

    changePrimaryHostLocation(host_location){
      host_location.primary = true;
      this.HostLocationService.update(host_location);
    }

    destroyHostLocation(host_location){
      this.HostLocationService.destroy(host_location.id);
    }

    onNewHostLocationChange(host_location){
      let phonePtrn =/[0-9]{3}-*[0-9]{3}-*[0-9]{4}/;
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
      // this.$log.log(this.newLocation);
    }

    refreshLocation(){
      this.newHostLocation = null;

    }

    toggleHostState(){
      this.hostState = !this.hostState;
      if( this.hostState ){
        this.hostStateLabel = "Host Profile";
      }else{
        this.hostStateLabel = "Taster Profile";
      }
    }

    updateUser(){
      this.UserService.update(this.user);
    }

  }
}
