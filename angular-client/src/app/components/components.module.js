
import {AddGuestModalComponent} from './add-guest-modal/add-guest-modal.component';
import {FooterMenuComponent} from './footer-menu/footer-menu.component';
import {GuestListItemComponent} from './guest-list-item/guest-list-item.component';
import {HostLocationModalComponent} from './host-location-modal/host-location-modal.component';
import {StateSelectorModalComponent} from './state-selector-modal/state-selector-modal.component';
import {TastingListItemComponent} from './tasting-list-item/tasting-list-item.component';
import {TastingDetailComponent} from './tasting-detail/tasting-detail.component';
import {TastingWineListItemComponent} from './tasting-wine-list-item/tasting-wine-list-item.component';
import {TastingWineModalComponent} from './tasting-wine-modal/tasting-wine-modal.component';
import {ToggleSwitchComponent} from './toggle-switch/toggle-switch.component';
import {WineAddModalComponent} from './wine-add-modal/wine-add-modal.component';
import {WineListItemComponent} from './wine-list-item/wine-list-item.component';
import {WineReviewComponent} from './wine-review/wine-review.component';

export const ComponentsModule = angular
  .module('ynoTasting.components', [])
  .component('addGuestModal', AddGuestModalComponent)
  .component('footerMenu', FooterMenuComponent)
  .component('guestListItem', GuestListItemComponent)
  .component('hostLocationModal', HostLocationModalComponent)
  .component('stateSelectorModal', StateSelectorModalComponent)
  .component('tastingDetail', TastingDetailComponent)
  .component('tastingListItem', TastingListItemComponent)
  .component('tastingWineListItem', TastingWineListItemComponent)
  .component('tastingWineModal', TastingWineModalComponent)
  .component('toggleSwitch', ToggleSwitchComponent)
  .component('wineAddModal', WineAddModalComponent)
  .component('wineListItem', WineListItemComponent)
  .component('wineReview', WineReviewComponent)
  .name;
