import {template} from './invitation-detail-modal.es6';

export const InvitationDetailModalComponent = {
  template,
  controller: class InvitationDetailModalController{
    constructor($scope, $log, $element, $rootScope,
      AlertsService,
      ModalService,
      GuestService,
      NotificationsService){

      'ngInject';
      this.$log = $log;
      this.name = "invitation-detail-modal";
      this.AlertsService = AlertsService;
      this.ModalService = ModalService;
      this.GuestService = GuestService;
      this.NotificationsService = NotificationsService;
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
          this.NotificationsService.setNotification("You're in! Your confirmation has been emailed to the host.");
          this.confirmModal();
        })
        .catch(()=>{
          this.AlertsService.setFailureAlert("Sorry, we didn't quite get that right. Please try again later.");
          // this.$log.error(err);
        });
    }

    denyInvitation(){
      this.GuestService.denyInvitation(this.invitation.tasting.id)
        .then(()=>{
          this.NotificationsService.setNotification("Maybe next time. The host has been notified.");
          this.confirmModal();
        })
        .catch(()=>{
          this.AlertsService.setFailureAlert("Sorry, we didn't quite get that right. Please try again later or email the host directly.");
          // this.$log.error(err);
        });
    }

  }
}
