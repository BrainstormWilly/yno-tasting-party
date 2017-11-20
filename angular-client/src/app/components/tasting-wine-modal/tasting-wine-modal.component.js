import {template} from './tasting-wine-modal.es6';

export const TastingWineModalComponent = {
  template,
  controller: class TastingWineModalController{
    constructor($scope, $log, $element, $rootScope, ModalService){
      'ngInject';
      this.$log = $log;
      this.name = "tasting-wine-modal";
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.tastingWine = {wine:{}};

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.tastingWine = {};
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

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.tastingWine);
    }

    // createWine(){
    //   this.WineService.createWine({wine:this.wine})
    //     .then(result=>{
    //       this.tastingWine = {};
    //       this.confirmModal(result.data);
    //     })
    //     .catch(err=>{
    //       this.$log.error(err);
    //     });
    // }

  }
}
