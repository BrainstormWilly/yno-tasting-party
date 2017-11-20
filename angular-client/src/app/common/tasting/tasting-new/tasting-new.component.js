import {template} from './tasting-new.es6';

export const TastingNewComponent = {
  bindings:{
    host: "<"
  },
  template,
  controller: class TastingNewController{
    constructor($scope, $log, $state,
      ModalService,
      GuestService,
      TastingService)
    {
      'ngInject';

      this.$log = $log;
      this.$state = $state;
      this.GuestService = GuestService;
      this.ModalService = ModalService;              // runs host location, wine, and guest modals
      this.TastingService = TastingService;
      this.currentFormState = 1;                     // states: general info, wines, guests
      this.tasting = null;                           // new tasting data
      this.tasting_wines = [];
      this.guests = [];
      this.hostTastingStatus = {state:false, label:"Host is not tasting"};

      /*
        modalStateChangeEvent()
        Track/react to modal states
      */
      let modalStateChangeEvent = $scope.$on('modal-state-change-event', (e,d) => {
        if( d.state=="confirmed" && d.name=="host-location-modal" ){
          let hlids = this.host.locations.map((v)=>{return v.id});
          if( !hlids.includes(d.data.id) ){
            this.host.locations.push(d.data);
          }
          this.setSelectedHostLocation(d.data);
        }
        if( d.state=="confirmed" && d.name=="tasting-wine-modal" ){
          this.tasting_wines.push(d.data);
        }
        if( d.state=="confirmed" && d.name=="add-guest-modal" ){
          this.inviteGuest(d.data);
        }
      });

      $scope.$on("destroy", modalStateChangeEvent);
    }

    /*
      $onInit()
      Initialize tasting data
    */
    $onInit() {

      this.tasting = {
        id: 9,
        name: "Taste Test 1",
        open_at: moment()
      }
      this.setSelectedHostLocation();
    }

    createTasting(){
      this.TastingService.createTasting(this.tasting)
        .then(result=>{
          this.tasting = result.data;
          this.currentFormState += 1;
        })
        .catch(err=>{
          this.$log.error(err);
        })
    }

    inviteGuest(user){
      this.GuestService.inviteGuest(this.tasting, user)
        .then(result=>{
          this.$log.log(result);
        })
        .catch(err=>{
          this.$log.error(err);
        })
    }

    /*
      setSelectedHostLocation(host_location=null)
      Sets tasting location when selected or defaults to host's primary location
    */
    setSelectedHostLocation(host_location=null){
      // this.$log.log(this.host.locations.length);
      for( let i=0; i<this.host.locations.length; i++ ){
        this.host.locations[i].selected = false;
        if( host_location && this.host.locations[i].id==host_location.id ){
          this.host.locations[i].selected = true;
        }else if( !host_location && this.host.locations[i].primary ){
          this.host.locations[i].selected = true;
          host_location = this.host.locations[i];
        }
      }
      // this.$log.log(host_location);
      this.tasting.location = host_location.location;
      this.tasting.location_id = this.tasting.location.id;
    }

    openModal(modal){
      this.ModalService.setModalState("open", modal);
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
      this.ModalService.setModalState("open", "tasting-wine-modal");
    }

    /*
      openGuestModal()
      Opens add guest modal
    */
    openGuestModal(){
      this.ModalService.setModalState("open", "add-guest-modal");
    }

    /*
      removeGuest(guest)
      removes guest from tasting
    */
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

    /*
      removeWine(tasting_wine)
      removes tasting wine from tasting
    */
    removeTastingWine(tasting_wine){
      for(let i=0; i<this.tasting.wines.length; i++){
        if( this.tasting.wines[i].id==tasting_wine.id ) this.tasting.wines.splice(i,1);
      }
    }

    /*
      setFormState(state)
      sets/validates new tasting form state
      *** DEPRECATE
    */
    setFormState(state){
      // let errors = false;
      if(state==1){
        if( this.currentFormState==1 ){
          if( this.tasting.name &&
            this.tasting.open_at &&
            this.tasting.location) {
            this.currentFormState = 2;
          }else{
            // set alert
          }
        }else{
          this.currentFormState += state;
        }
      }else if (state==-1) {
        this.currentFormState += state;
      }
    }

    toggleHostTastingStatus(state){
      for( let i=0; i<this.tasting.guests.length; i++ ){
        if(this.tasting.guests[i].taster.id && this.tasting.guests[i].taster.id==this.host.taster.id){
          this.tasting.guests.splice(i,1);
          break;
        }
      }
      if( state ){
        this.tasting.guests.push({
          temp_id: this.tasting.guests.length,
          taster: this.host.taster
        });
        this.hostTastingStatus.state = true;
        this.hostTastingStatus.label = "Host is tasting";
      }else{
        this.hostTastingStatus.state = false;
        this.hostTastingStatus.label = "Host is not tasting";
      }
    }

  } // close controller
} // close component
