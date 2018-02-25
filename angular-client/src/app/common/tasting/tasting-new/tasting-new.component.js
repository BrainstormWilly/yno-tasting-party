import {template} from './tasting-new.es6';

export const TastingNewComponent = {
  bindings:{
    host: "<"
  },
  template,
  controller: class TastingNewController{
    constructor($scope, $log, $state, lodash,
      ModalService,
      GuestService,
      TastingService,
      TastingWineService,
      WineService)
    {
      'ngInject';

      this.$log = $log;
      this.$state = $state;
      this._ = lodash;
      this.GuestService = GuestService;
      this.ModalService = ModalService;              // runs host location, wine, and guest modals
      this.TastingService = TastingService;
      this.TastingWineService = TastingWineService;
      this.WineService = WineService;
      this.currentFormState = 1;                     // states: general info, wines, guests
      this.tasting = {
        tasting_wines: [],
        guests: []
      };
      this.minOpenDate = moment();
      this.minCloseDate = moment().add(1,'h');
      // this.tasting.tasting_wines = [];
      // this.tasting.guests = [];
      this.hostTastingStatus = {state:false, label:"Host is not tasting"};


      let createHostLocationEvent = $scope.$on("create-host-location-event", (e,d)=>{
        if( d.primary ) this._.each(this.host.locations, (v)=>{v.primary=false});
        this.host.locations.push(d);

        // this.setSelectedHostLocation(d);
      });

      let createTastingEvent = $scope.$on("create-tasting-event", (e,d)=>{
        this.currentFormState = 2;
        this.tasting = d;
      });

      let createTastingWineEvent = $scope.$on("tasting-wine-create-event", (e,d)=>{
        this.tasting.tasting_wines.push(d);
      });

      let destroyTastingWineEvent = $scope.$on("tasting-wine-destroy-event", (e,d)=>{
        // $log.log("TastingNewComponent.constructor", d);
        for(let i=0; i<this.tasting.tasting_wines.length; i++){
          if( this.tasting.tasting_wines[i].id==d.id ) {
            this.tasting.tasting_wines.splice(i,1);
            break;
          }
        }
      });

      let includeHostAsGuestEvent = $scope.$on("include-host-as-guest-event", (e,d)=>{
        this.tasting.guests.push(d);
      });

      let inviteNewUserEvent = $scope.$on("invite-new-user-event", (e,d)=>{
        this.tasting.guests.push(d);
      });

      let inviteTasterEvent = $scope.$on("invite-taster-event", (e,d)=>{
        this.tasting.guests.push(d);
      });

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if( d.name=="host-location-modal" && d.state=="confirmed"){
          // this.setSelectedHostLocation(d.data);
          this.tasting.location = d.data;
          this.tasting.location_id = d.data.id;
        }
      });

      let removeHostAsGuestEvent = $scope.$on("remove-host-as-guest-event", ()=>{
        for( let i=0; i<this.tasting.guests.length; i++ ){
          if(this.tasting.guests[i].taster_id && this.tasting.guests[i].taster_id==this.tasting.host.taster_id){
            this.tasting.guests.splice(i,1);
            break;
          }
        }
      });


      $scope.$on("$destroy", createHostLocationEvent);
      $scope.$on("$destroy", createTastingEvent);
      $scope.$on("$destroy", createTastingWineEvent);
      $scope.$on("$destroy", destroyTastingWineEvent);
      $scope.$on("$destroy", includeHostAsGuestEvent);
      $scope.$on("$destroy", inviteNewUserEvent);
      $scope.$on("$destroy", inviteTasterEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
      $scope.$on("$destroy", removeHostAsGuestEvent);
    }

    /*
      $onInit()
      Initialize tasting data
    */
    $onInit() {
      // this.tasting.open_at = moment();
      this.tasting.host_id = this.host.id;
      this.tasting.host = this.host;
      for( let i=0; i<this.host.locations.length; i++ ){
        if( this.host.locations[i].primary ){
          this.tasting.host.locations[i].selected = true;
          this.tasting.location = this.host.locations[i].location;
          this.tasting.location_id = this.tasting.location.id;
          break;
        }
      }
    }

    createTasting(){
      let tasting = angular.copy(this.tasting)
      tasting.open_at = this.tasting.open_at.utc();
      if( tasting.close_at ) tasting.close_at = this.tasting.close_at.utc();
      this.TastingService.createTasting(tasting);
    }

    destroyTastingWine(tasting_wine){
      // this.$log.log("TastingNewComponent.destroyTastingWine", tasting_wine);
      this.TastingWineService.destroy(tasting_wine);
    }

    editTasting(){
      // this.$log.log("TastingNewComponent.editTasting", this.$state);
      this.$state.go("tasting-show", {"id":this.tasting.id});
    }

    onOpenAtChange(newValue){
      this.minCloseDate = moment(newValue).add(1,'h');
    }

    openConnectionModal(){
      this.ModalService.setModalState("open", "add-connection-modal");
    }

    /*
      openHostLocationModal()
      Opens host location modal
    */
    openHostLocationModal(){
      this.ModalService.setModalState("open", "host-location-modal");
    }

    /*
      openTastingWineModal()
      Opens tasting wine modal
    */
    openTastingWineModal(){
      this.ModalService.setModalState("open", "tasting-wine-modal", this.tasting);
    }

    /*
      openGuestModal()
      Opens add guest modal
    */
    openGuestModal(){
      this.ModalService.setModalState("open", "add-guest-modal");
    }

    removeGuest(guest){
      if(guest.taster.id && guest.taster.id==this.host.taster.id){
        this.hostTastingStatus.state = false;
        this.hostTastingStatus.label = "Host is not tasting";
      }
      for( let i=0; i<this.tasting.guests.length; i++ ){
        if(this.tasting.guests[i].temp_id==guest.temp_id){
          this.tasting.guests.splice(i,1);
          break;
        }
      }
    }

    setSelectedHostLocation(location=null){
      // this.$log.log(this.host.locations.length);
      // for( let i=0; i<this.host.locations.length; i++ ){
      //   this.host.locations[i].selected = false;
      //   if( host_location && this.host.locations[i].id==host_location.id ){
      //     this.host.locations[i].selected = true;
      //   }else if( !host_location && this.host.locations[i].primary ){
      //     this.host.locations[i].selected = true;
      //     host_location = this.host.locations[i];
      //   }
      // }
      this.$log.log(location);
      this.tasting.location = location;
      this.tasting.location_id = location.id;
    }

    // toggleHostTastingStatus(){
    //   if( this.hostTastingStatus.state ){
    //     this.GuestService.removeHost(this.tasting.id)
    //       .then(()=>{
    //         for( let i=0; i<this.tasting.guests.length; i++ ){
    //           if(this.tasting.guests[i].taster_id && this.tasting.guests[i].taster_id==this.tasting.host.taster_id){
    //             this.tasting.guests.splice(i,1);
    //             break;
    //           }
    //         }
    //         this.hostTastingStatus.state = false;
    //         this.hostTastingStatus.label = "Host is not tasting";
    //       })
    //       .catch(err=>{
    //         this.$log.error("TastingNewComponent.toggleHostTastingStatus", err);
    //       })
    //
    //   }else{
    //     this.GuestService.includeHost(this.tasting.id)
    //       .then(result=>{
    //         this.tasting.guests.push(result.data);
    //         this.hostTastingStatus.state = true;
    //         this.hostTastingStatus.label = "Host is tasting";
    //       })
    //       .catch(err=>{
    //         this.$log.error("TastingNewComponent.toggleHostTastingStatus", err);
    //       })
    //   }
    // }

  } // close controller
} // close component
