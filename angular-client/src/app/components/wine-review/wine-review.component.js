import {template} from './wine-review.es6';

export const WineReviewComponent = {
  bindings: {
    review: "<",
    reviewModalTrigger: "&"
  },
  template,
  controller: class WineReviewComponent{
    constructor($scope, $log, WineReviewService){
      'ngInject';
      this.$log = $log;
      this.WineReviewService = WineReviewService;

      let currentWineReviewChangeEvent = $scope.$on('current-wine-review-change-event', () => {
        this.$log.log("WineReviewComponent: success");
        this.reviewModalTrigger();
      });

      $scope.$on('$destroy', currentWineReviewChangeEvent);
    }

    $onInit() {
      this.ratings = [
        {label:"Awesome!", rating: 5},
        {label:"Good", rating: 4},
        {label:"OK", rating: 3},
        {label:"So So", rating: 2},
        {label:"Yuck!", rating: 1}
      ];

    }

    getRatingStyle(rating) {
      if( !this.review ) return "";
      let cls = "";
      if(rating > 3){
        cls = "good";
      }else if(rating < 3){
        cls = "bad";
      }else{
        cls = "ok";
      }
      if( this.review.rating==rating ){
        cls += " selected";
      }
      return cls;
    }

    updateReview(){

      this.WineReviewService.updateReview(this.review);
    }

  }
}
