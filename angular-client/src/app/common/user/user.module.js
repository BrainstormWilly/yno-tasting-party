import {UserComponent} from './user.component';
import {UserHostComponent} from './user-host/user-host.component'
import {UserConfig} from './user.config';


export const UserModule = angular
  .module('user',[])
  .component('user', UserComponent)
  .component('userHost', UserHostComponent)
  .config(UserConfig)
  .name;
