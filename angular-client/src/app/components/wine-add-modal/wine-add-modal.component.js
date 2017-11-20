import {template} from './wine-add-modal.es6';

export const WineAddModalComponent = {
  template,
  controller: class WineAddModalController{
    constructor($scope, $log, $element, $rootScope, ModalService, WineService){
      'ngInject';
      this.$log = $log;
      this.name = "wine-add-modal";
      this.ModalService = ModalService;
      this.WineService = WineService;
      this.modalState = "closed";
      this.wine = {};

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0});
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

    confirmModal(data){
      this.ModalService.setModalState("confirmed", this.name, data);
    }

    createWine(){
      this.WineService.createWine({wine:this.wine})
        .then(result=>{
          this.wine = {};
          this.confirmModal(result.data);
        })
        .catch(err=>{
          this.$log.error(err);
        });
    }

  }
}
