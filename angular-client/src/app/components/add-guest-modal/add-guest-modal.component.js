import {template} from './add-guest-modal.es6';

export const AddGuestModalComponent = {
  bindings:{
    tasting: "<"
  },
  template,
  controller: class AddGuestModalController{
    constructor($scope, $log, $element,
      ModalService,
      GuestService,
      TasterService,
      UserService){

      'ngInject';
      this.$log = $log;
      this.name = "add-guest-modal";
      this.GuestService = GuestService;
      this.ModalService = ModalService;
      this.TasterService = TasterService;
      this.UserService = UserService;
      this.modalState = "closed";
      this.viewState = 1;
      this.user = {};
      this.result = {};
      this.connections = [];
      this.addGuestStatus = {
        state: false,
        label: "Invite New Users"
      };
      this.hostTastingStatus = {
        state:false,
        label:"Include Host"
      };
      this.wait = false;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0, onComplete:()=>{
              this.user = {};
              // this.viewState = 1;
              this.result = {};
              // this.connections = [];
            }});
          }
        }
      });

      let destroyGuestEvent = $scope.$on("destroy-guest-event", (e,d)=>{
        let i;
        if( d.taster_id==this.tasting.host.taster.id ){
          this.hostTastingStatus.state = false;
          this.hostTastingStatus.label = "Include Host";
        }else{
          for( i=0; i<this.tasting.host.connections.length; i++ ){
            if( this.tasting.host.connections[i].taster_id==d.taster_id ){
              this.connections.push(this.tasting.host.connections[i]);
              break;
            }
          }
        }
      });

      let includeHostAsGuestEvent = $scope.$on("include-host-as-guest-event", ()=>{
        this.hostTastingStatus.state = true;
        this.hostTastingStatus.label = "Host Included";
      });

      let inviteNewUserEvent = $scope.$on("invite-new-user-event", ()=>{
        this.confirmModal();
      });

      let inviteTasterEvent = $scope.$on("invite-taster-event", (e,d)=>{
        this.wait = false;
        this.viewState = 1;
        for( let i=0; i<this.connections.length; i++ ){
          // $log.log("AddGuestModalComponent.constructor", this.connections[i], d);
          if( d.taster_id==this.connections[i].taster_id ){
            this.connections.splice(i,1);
            break;
          }
        }
      });


      // let removeHostAsGuestEvent = $scope.$on("remove-host-as-guest-event", (e,d)=>{
      //   this.hostTastingStatus.state = false;
      //   this.hostTastingStatus.label = "Host is not tasting";
      // });

      $scope.$on("$destroy", destroyGuestEvent);
      $scope.$on("$destroy", includeHostAsGuestEvent);
      $scope.$on("$destroy", inviteNewUserEvent);
      $scope.$on("$destroy", inviteTasterEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
      // $scope.$on("$destroy", removeHostAsGuestEvent);
    }

    $onInit() {
      let i, j, hc, g, gflag;

      this.ModalService.registerModal(this);

      // check to see if host is guest
      for( i=0; i<this.tasting.guests.length; i++ ){
        g = this.tasting.guests[i];
        // this.$log.log("AddGuestModalComponent.$onInit", g.taster_id, this.tasting.host.taster.id);
        if( g.taster_id==this.tasting.host.taster.id ){
          this.hostTastingStatus.state = true;
          this.hostTastingStatus.label = "Host Included";
          break;
        }
      }

      // add non-guested connections
      for( i=0; i<this.tasting.host.connections.length; i++ ){
        hc = this.tasting.host.connections[i];
        gflag = false;
        for( j=0; j<this.tasting.guests.length; j++ ){
          g = this.tasting.guests[j];
          if( hc.taster_id==g.taster_id ){
            // this.$log.log("AddGuestModalComponent.$onInit", g, hc);
            gflag = true;
            break;
          }
        }
        if( !gflag ){
          this.connections.push(hc);
        }
      }
    }

    closeModal(){
      this.viewState = 1;
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.wait = false;
      this.ModalService.setModalState("confirmed", this.name);
    }

    inviteNewUser(){
      this.wait = true;
      if( this.user.id ){
        this.TasterService.getTasterFromUser(this.user.id)
          .then(taster=>{
            this.GuestService.inviteTaster(this.tasting.id, taster.id);
          })
      }else{
        this.GuestService.inviteNewUser(this.tasting.id, this.user.email);
      }
    }

    inviteConnection(connection){
      connection.wait = true;
      this.GuestService.inviteTaster(this.tasting.id, connection.taster_id);
    }

    searchUserByEmail(email){
      this.wait = true;
      this.UserService.getUserByEmail(email)
        .then(user=>{
          this.viewState = 2;
          if(user){
            this.$log.log("AddGuestModalComponent.searchUserByEmail", user);
            this.user = user;
            this.result.title = email + " is already a registered taster!"
            this.result.body = "Send them a tasting invite?";
          }else{
            this.user = {email:email}
            this.result.title = email + " is not a registered taster."
            this.result.body = "Send them an invitation to join Yno Tasting?";
          }
        })
        .finally(()=>{
          this.wait = false;
        })
    }

    toggleAddGuestMethod(){
      if( this.addGuestStatus.state ){
        this.addGuestStatus.state = false;
        this.addGuestStatus.label = "Invite New User";
      }else{
        this.addGuestStatus.state = true;
        this.addGuestStatus.label = "Invite Connected Taster";
      }
    }

    addHostToGuests(){
      this.GuestService.includeHost(this.tasting.id);
    }

  }
}
