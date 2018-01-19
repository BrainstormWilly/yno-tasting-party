import {AlertsService} from './services.alerts';
import {ModalService} from './services.modal';
import {GuestService} from './services.guest';
import {HostService} from './services.host';
import {HostLocationService} from './services.host_location';
import {LocationService} from './services.location';
import {NotificationsService} from './services.notifications';
import {TasterService} from './services.taster';
import {TastingService} from './services.tasting';
import {TastingWineService} from './services.tasting_wine';
import {UserService} from './services.user';
import {WineService} from './services.wine';
import {WineReviewService} from './services.wine-review';


export const ServicesModule = angular
  .module('ynoTasting.services',[])
  .service('AlertsService', AlertsService)
  .service('GuestService', GuestService)
  .service('HostService', HostService)
  .service('HostLocationService', HostLocationService)
  .service('LocationService', LocationService)
  .service('ModalService', ModalService)
  .service('NotificationsService', NotificationsService)
  .service('TasterService', TasterService)
  .service('TastingService', TastingService)
  .service('TastingWineService', TastingWineService)
  .service('UserService', UserService)
  .service('WineService', WineService)
  .service('WineReviewService', WineReviewService)
  .name;
