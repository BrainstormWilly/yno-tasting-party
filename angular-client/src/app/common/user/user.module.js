import {UserComponent} from './user.component';
import {UserConfig} from './user.config';


export const UserModule = angular
  .module('user',[])
  .component('user', UserComponent)
  .config(UserConfig)
  .name;
