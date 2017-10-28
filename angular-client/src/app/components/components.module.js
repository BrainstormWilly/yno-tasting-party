import {NavComponent} from './nav/nav.component';
import {GuestListItemComponent} from './guest-list-item/guest-list-item.component';
import {TastingListItemComponent} from './tasting-list-item/tasting-list-item.component';
import {TastingDetailComponent} from './tasting-detail/tasting-detail.component';
import {WineListItemComponent} from './wine-list-item/wine-list-item.component';
import {WineReviewComponent} from './wine-review/wine-review.component';

export const ComponentsModule = angular
  .module('ynoTasting.components', [])
  .component('nav', NavComponent)
  .component('guestListItem', GuestListItemComponent)
  .component('wineListItem', WineListItemComponent)
  .component('wineReview', WineReviewComponent)
  .component('tastingListItem', TastingListItemComponent)
  .component('tastingDetail', TastingDetailComponent)
  .name;
