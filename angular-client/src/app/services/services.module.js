
import {TasterService} from './services.taster';
import {UserService} from './services.user';


export const ServicesModule = angular
  .module('ynoTasting.services',[])
  .service('TasterService', TasterService)
  .service('UserService', UserService)
  .name;
