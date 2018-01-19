import {WineReviewsComponent} from './wine-reviews.component';
import {WineReviewsConfig} from './wine-reviews.config';


export const WineReviewsModule = angular
  .module('wineReviews',[])
  .component('wineReviews', WineReviewsComponent)
  .config(WineReviewsConfig)
  .name;
