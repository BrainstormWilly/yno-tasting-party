import {template} from './wine-reviews.es6';

export const WineReviewsComponent = {
  bindings: {
    reviews: "<"
  },
  template,
  controller: class WineReviewsController{
    constructor($scope, $log, $state){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
    }

    $onInit() {
      this.$log.log("WineReviewsComponent.$onInit", this.reviews);

    }

  }
}
