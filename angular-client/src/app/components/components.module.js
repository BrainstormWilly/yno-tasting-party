
import {AddGuestModalComponent} from './add-guest-modal/add-guest-modal.component';
import {AlertsModalComponent} from './alerts-modal/alerts-modal.component';
import {ConnectionListItemComponent} from './connection-list-item/connection-list-item.component';
// import {ConnectionSelectorModalComponent} from './connection-selector-modal/connection-selector-modal.component';
import {FooterMenuComponent} from './footer-menu/footer-menu.component';
import {GuestListItemComponent} from './guest-list-item/guest-list-item.component';
import {HostLocationFormComponent} from './host-location-form/host-location-form.component';
import {HostLocationModalComponent} from './host-location-modal/host-location-modal.component';
import {InvitationDetailModalComponent} from './invitation-detail-modal/invitation-detail-modal.component';
import {NotificationComponent} from './notification/notification.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ShowGuestModalComponent} from './show-guest-modal/show-guest-modal.component';
import {StateSelectorModalComponent} from './state-selector-modal/state-selector-modal.component';
import {TastingListItemComponent} from './tasting-list-item/tasting-list-item.component';
import {TastingDetailComponent} from './tasting-detail/tasting-detail.component';
import {TastingDetailModalComponent} from './tasting-detail-modal/tasting-detail-modal.component';
// import {TastingWineListItemComponent} from './tasting-wine-list-item/tasting-wine-list-item.component';
import {TastingWineModalComponent} from './tasting-wine-modal/tasting-wine-modal.component';
import {ToggleSwitchComponent} from './toggle-switch/toggle-switch.component';
import {WineAddModalComponent} from './wine-add-modal/wine-add-modal.component';
import {WineInfoModalComponent} from './wine-info-modal/wine-info-modal.component';
import {WineListItemComponent} from './wine-list-item/wine-list-item.component';
// import {WineRevealListItemComponent} from './wine-reveal-list-item/wine-reveal-list-item.component';
import {WineRevealModalComponent} from './wine-reveal-modal/wine-reveal-modal.component';
// import {WineReviewListItemComponent} from './wine-review-list-item/wine-review-list-item.component';
import {WineReviewModalComponent} from './wine-review-modal/wine-review-modal.component'
import {WineReviewStatusModalComponent} from './wine-review-status-modal/wine-review-status-modal.component'

export const ComponentsModule = angular
  .module('ynoTasting.components', [])
  .component('addGuestModal', AddGuestModalComponent)
  .component('alertsModal', AlertsModalComponent)
  .component('connectionListItem', ConnectionListItemComponent)
  // .component('connectionSelectorModal', ConnectionSelectorModalComponent)
  .component('footerMenu', FooterMenuComponent)
  .component('guestListItem', GuestListItemComponent)
  .component('hostLocationForm', HostLocationFormComponent)
  .component('hostLocationModal', HostLocationModalComponent)
  .component('invitationDetailModal', InvitationDetailModalComponent)
  .component('notification', NotificationComponent)
  .component('progressBar', ProgressBarComponent)
  .component('showGuestModal', ShowGuestModalComponent)
  .component('stateSelectorModal', StateSelectorModalComponent)
  .component('tastingDetail', TastingDetailComponent)
  .component('tastingDetailModal', TastingDetailModalComponent)
  .component('tastingListItem', TastingListItemComponent)
  // .component('tastingWineListItem', TastingWineListItemComponent)
  .component('tastingWineModal', TastingWineModalComponent)
  .component('toggleSwitch', ToggleSwitchComponent)
  .component('wineAddModal', WineAddModalComponent)
  .component('wineInfoModal', WineInfoModalComponent)
  .component('wineListItem', WineListItemComponent)
  // .component('wineRevealListItem', WineRevealListItemComponent)
  .component('wineRevealModal', WineRevealModalComponent)
  // .component('wineReviewListItem', WineReviewListItemComponent)
  .component('wineReviewModal', WineReviewModalComponent)
  .component('wineReviewStatusModal', WineReviewStatusModalComponent)
  .name;
