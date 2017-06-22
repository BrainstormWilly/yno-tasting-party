import {ReviewsComponent} from './reviews.component';
import {ReviewsConfig} from './reviews.config';


export const ReviewsModule = angular
  .module('reviews',[])
  .component('reviews', ReviewsComponent)
  .config(ReviewsConfig)
  .name;
