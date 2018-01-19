import {template} from './wine-review-status-modal.es6';

export const WineReviewStatusModalComponent = {
  template,
  controller: class WineReviewStatusModalController{
    constructor($scope, $log, $element,
      ModalService,
      WineReviewService){

      'ngInject';
      this.$log = $log;
      this.name = "wine-review-status-modal";
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.wineReview = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            WineReviewService.getStatus(d.data)
              .then(review=>{
                this.wineReview = review;
              });
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.wineReview = null;
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      // this.$log.log("WineRevealModalComponent.$onInit", this.tastingWines);
      this.ModalService.registerModal(this);
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(data){
      this.ModalService.setModalState("confirmed", this.name, data);
    }

  }
}
