import {template} from './tasting-wine-review.es6';

export const TastingWineReviewComponent = {
  bindings: {
    tasterReview: "<",
    averageReview: "<",
    wineNumber: "<"
  },
  template,
  controller: class TastingWineReviewController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      this.$log.log("TastingWineReviewComponent $onInit");
      // this.UserService.validateUser();
    }

  }
}
