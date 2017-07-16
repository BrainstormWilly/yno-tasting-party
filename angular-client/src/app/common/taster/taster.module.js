
import {TasterTastingsModule} from './tastings/taster-tastings.module';
// import {TasterReviewsModule} from './tastings/reviews.module';


export const TasterModule = angular
  .module('ynoTasting.taster', [
    TasterTastingsModule
  ])
  .name;
