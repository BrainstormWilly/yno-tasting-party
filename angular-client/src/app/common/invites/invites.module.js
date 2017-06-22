import {InvitesComponent} from './invites.component';
import {InvitesConfig} from './invites.config';


export const InvitesModule = angular
  .module('invites',[])
  .component('invites', InvitesComponent)
  .config(InvitesConfig)
  .name;
