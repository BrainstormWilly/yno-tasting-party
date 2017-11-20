import {template} from './add-guest-modal.es6';

export const AddGuestModalComponent = {
  template,
  controller: class AddGuestModalController{
    constructor($scope, $log, $element, $rootScope,
      ModalService,
      GuestService,
      UserService){
      'ngInject';
      this.$log = $log;
      this.name = "add-guest-modal";
      this.GuestService = GuestService;
      this.ModalService = ModalService;
      this.UserService = UserService;
      this.modalState = "closed";
      this.viewState = 1;
      this.user = {};
      this.result = {};

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
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

      $scope.$on("destroy", modalStateChangeEvent);
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

    searchGuestByEmail(email){
      this.UserService.getUserByEmail(email)
        .then(result=>{
          this.viewState = 2;
          if(result.data){
            this.user = result.data;
            this.result.title = this.user.email + " is already a registered taster!"
            this.result.body = "Send them a tasting invite?";
          }else{
            this.user = {email:email}
            this.result.title = email + " is not a registered taster."
            this.result.body = "Send them an invitation to join Yno Tasting?";
          }
        })
        .catch(()=>{
          this.result.title = email + " is not a registered taster."
          this.result.body = "Send them an invitation to join Yno Tasting?";
        });
    }

  }
}
