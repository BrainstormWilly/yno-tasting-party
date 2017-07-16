import {template} from './reviews.es6';

export const TasterReviewsComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterReviewsController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.reviews = [];

      let reviewsChangeEvent = $scope.$on('taster-reviews-change-event', (e,d) => {
        if( d ){
          this.reviews = d;
        }else{
          this.$state.go('reviews');
        }
      });

      $scope.$on('$destroy', reviewsChangeEvent);
    }

    $onInit() {
      this.$log.log("TasterReviewsComponent $onInit");
      this.TasterService.loadReviews(this.taster.id)
    }

  }
}
