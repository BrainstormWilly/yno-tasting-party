import {template} from './show-guest-modal.es6';

export const ShowGuestModalComponent = {
  template,
  controller: class ShowGuestModalController{
    constructor($scope, $log, $element, $rootScope,
      ModalService,
      GuestService){
      'ngInject';
      this.$log = $log;
      this.name = "show-guest-modal";
      this.GuestService = GuestService;
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.guest = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            this.GuestService.show(d.data.id)
              .then(guest=>{
                this.guest = guest;
              });
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{

            TweenMax.to($element, 0.5, {autoAlpha:0, onComplete:()=>{
              this.user = {};
              this.viewState = 1;
              this.result = {};
            }});
          }
        }
      });

      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.user);
    }

  }
}
