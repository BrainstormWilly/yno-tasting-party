import {ModalService} from './services.modal';
import {GuestService} from './services.guest';
import {HostService} from './services.host';
import {HostLocationService} from './services.host_location';
import {TasterInitialData} from './services.taster_initial_data';
import {TasterService} from './services.taster';
import {TastingService} from './services.tasting';
import {TastingNewService} from './services.tasting_new';
import {TastingWineService} from './services.tasting_wine';
import {UserService} from './services.user';
import {WelcomeInitialData} from './services.welcome_initial_data';
import {WineService} from './services.wine';
import {WineReviewService} from './services.wine-review';


export const ServicesModule = angular
  .module('ynoTasting.services',[])
  .service('GuestService', GuestService)
  .service('HostService', HostService)
  .service('HostLocationService', HostLocationService)
  .service('ModalService', ModalService)
  .service('TasterInitialData', TasterInitialData)
  .service('TasterService', TasterService)
  .service('TastingService', TastingService)
  .service('TastingNewService', TastingNewService)
  .service('TastingWineService', TastingWineService)
  .service('UserService', UserService)
  .service('WelcomeInitialData', WelcomeInitialData)
  .service('WineService', WineService)
  .service('WineReviewService', WineReviewService)
  .name;
