import {template} from './wine-review-modal.es6';

export const WineReviewModalComponent = {
  bindings:{
    tasting: "<"
  },
  template,
  controller: class WineReviewModalController{
    constructor($scope, $log, $element, ModalService, WineReviewService){
      'ngInject';
      this.$log = $log;
      this.name = "wine-review-modal";
      this.ModalService = ModalService;
      this.WineReviewService = WineReviewService;
      this.modalState = "closed";
      this.pending_review = {};
      this.ratings = [
        {number:1, label:"Bad", cls:"bad"},
        {number:2, label:"", cls:""},
        {number:3, label:"OK", cls:"ok"},
        {number:4, label:"", cls:""},
        {number:5, label:"Excellent", cls:"excellent"}
      ];

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        // this.$log.log(d.state);
        if(d.name==this.name ){
          if( d.state=="open" ){
            this.pending_review = angular.copy(d.data);
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.pending_review = {};
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      let wineReviewUpdateEvent = $scope.$on("wine-review-update-event", (e,d)=>{
        this.ModalService.setModalState("confirmed", this.name, d);
      })

      $scope.$on("$destroy", modalStateChangeEvent);
      $scope.$on("$destroy", wineReviewUpdateEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
      // this.$log.log(this.tastingStatus);

    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    updateReview(){
      this.WineReviewService.updateReview(this.pending_review);
    }

    // confirmModal(){
    //   this.WineReviewService.updateReview(this.pending_review)
    //     .then(result=>{
    //       this.ModalService.setModalState("confirmed", this.name, result.data);
    //     })
    //     .catch(err=>{
    //       this.$log.error(err);
    //     })
    // }

  }
}
