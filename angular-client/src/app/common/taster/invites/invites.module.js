import {TasterInvitesComponent} from './invites.component';
import {TasterInvitesConfig} from './invites.config';


export const TasterInvitesModule = angular
  .module('invites',[])
  .component('invites', TasterInvitesComponent)
  .config(TasterInvitesConfig)
  .name;
