import {template} from './invitation-detail-modal.es6';

export const InvitationDetailModalComponent = {
  template,
  controller: class InvitationDetailModalController{
    constructor($scope, $log, $element, $rootScope, ModalService, GuestService){
      'ngInject';
      this.$log = $log;
      this.name = "invitation-detail-modal";
      this.ModalService = ModalService;
      this.GuestService = GuestService;
      this.modalState = "closed";
      this.invitation = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            this.invitation = d.data;
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.invitation = null;
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      $scope.$on("destroy", modalStateChangeEvent);
    }

    $onInit() {
      // this.$log.log(this.tasting);
      this.ModalService.registerModal(this);
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.invitation);
    }

    confirmInvitation(){
      this.GuestService.confirmInvitation(this.invitation.tasting.id)
        .then(()=>{
          this.confirmModal();
        })
        .catch(err=>{
          this.$log.error(err);
        });
    }

    denyInvitation(){
      this.GuestService.denyInvitation(this.invitation.tasting.id)
        .then(()=>{
          this.confirmModal();
        })
        .catch(err=>{
          this.$log.error(err);
        });
    }

  }
}
