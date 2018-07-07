import {template} from './wine-reveal-modal.es6';

export const WineRevealModalComponent = {
  bindings:{
    tastingWines: "<"
  },
  template,
  controller: class WineRevealModalController{
    constructor($scope, $log, $element, ModalService, TastingWineService, WineReviewService){
      'ngInject';
      this.$log = $log;
      this.name = "wine-reveal-modal";
      this.ModalService = ModalService;
      this.TastingWineService = TastingWineService;
      this.WineReviewService = WineReviewService;
      this.modalState = "closed";
      this.pending_review = {};

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            $log.log(d.data);
            this.pending_review = angular.copy(d.data);
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.review = null;
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      // let wineReviewUpdateEvent = $scope.$on("wine-review-update-event", ()=>{
      //   this.pending_review = null;
      //   this.confirmModal(null);
      // });

      let wineRevealEvent = $scope.$on("wine-reveal-event", ()=>{
        this.pending_review = null;
        this.confirmModal(null);
      });

      let tastingWineUpdateEvent = $scope.$on("tasting-wine-update-event", (e,d)=>{
        this.pending_review.wine_id = d.wine_id;
        this.WineReviewService.reveal(this.pending_review);
      });

      $scope.$on("$destroy", modalStateChangeEvent);
      $scope.$on("$destroy", tastingWineUpdateEvent);
      $scope.$on("$destroy", wineRevealEvent);
      // this.pending_review = null;

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

    revealWine(tasting_wine){
      tasting_wine.wine_number = this.pending_review.wine_number;
      tasting_wine.average_rating = this.pending_review.average_rating;
      this.TastingWineService.update(tasting_wine);
    }

  }
}
