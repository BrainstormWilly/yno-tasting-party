import {TasterReviewsComponent} from './reviews.component';
import {TasterReviewsConfig} from './reviews.config';


export const TasterReviewsModule = angular
  .module('reviews',[])
  .component('reviews', TasterReviewsComponent)
  .config(TasterReviewsConfig)
  .name;
