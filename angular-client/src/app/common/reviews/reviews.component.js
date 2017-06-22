import {template} from './reviews.es6';

export const ReviewsComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class ReviewsController{
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
      this.$log.log("ReviewsComponent $onInit");
      this.TasterService.loadReviews(this.taster.id)
    }

  }
}
