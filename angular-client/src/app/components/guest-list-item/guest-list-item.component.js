import {template} from './guest-list-item.es6';

export const GuestListItemComponent = {
  bindings:{
    guest: "<",
    deleteAction: "&",
    selectAction: "&",
    editable: "<"
  },
  template,
  controller: class GuestListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("GuestListItemComponent.$onInit",this.guest);
      this.inviteStatus = this.parseInviteStatus();
      this.handle = this.guest.full_handle;
    }

    // parseHandle(){
    //   let h = "";
    //   if( this.guest.taster.name ){
    //     h = this.guest.taster.name;
    //     if( this.guest.taster.handle ){
    //       h += " (" + this.guest.taster.handle + ")";
    //     }
    //   }else{
    //     h = this.guest.taster.user.email;
    //   }
    //   return h;
    // }

    parseInviteStatus(){
      if( this.guest.confirmed ) return "Confirmed " + this.guest.confirmed;
      return "Invited " + this.guest.invited;
    }

  }
}
