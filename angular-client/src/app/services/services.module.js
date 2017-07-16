
import {TasterService} from './services.taster';
import {TastingService} from './services.tasting';
import {UserService} from './services.user';
import {WineReviewService} from './services.wine-review';


export const ServicesModule = angular
  .module('ynoTasting.services',[])
  .service('TasterService', TasterService)
  .service('TastingService', TastingService)
  .service('UserService', UserService)
  .service('WineReviewService', WineReviewService)
  .name;
