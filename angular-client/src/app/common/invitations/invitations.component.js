import {template} from './invitations.es6';

export const InvitationsComponent = {
  bindings: {
    taster: "<",
    invitations: "<"
  },
  template,
  controller: class InvitationsComponent{
    constructor($scope, $log, $state, ModalService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.ModalService = ModalService;
      this.TasterService = TasterService;

      let modalStateChangeEvent = $scope.$on('modal-state-change-event', (e,d) => {
        if( d.state=="confirmed" && d.name=="invitation-detail-modal" ){
          for(let i=0; i<this.invitations.length; i++){
            if( this.invitations[i].id==d.data.id ){
              this.invitations.splice(i,1);
              break;
            }
          }
          if( this.invitations.length==0 ) this.$state.go("dashboard");
        }
      });

      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      // this.$log.log(this.invitations);
    }

    selectInvitation(invitation){
      this.ModalService.setModalState("open", "invitation-detail-modal", invitation);
    }

  }
}
