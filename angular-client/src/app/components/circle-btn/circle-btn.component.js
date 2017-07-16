import {template} from './circle-btn.es6';

export const CircleBtnComponent = {
  bindings: {
    tasterReview: "<",
    averageReview: "<",
    wineNumber: "<",
    color: "@"
  },
  template,
  controller: class CircleBtnController{
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
