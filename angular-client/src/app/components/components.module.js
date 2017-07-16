import {NavComponent} from './nav/nav.component';
import {WineReviewComponent} from './wine-review/wine-review.component';

export const ComponentsModule = angular
  .module('ynoTasting.components', [])
  .component('nav', NavComponent)
  .component('wineReview', WineReviewComponent)
  .name;
