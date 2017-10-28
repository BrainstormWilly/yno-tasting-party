import {TasterInvitesComponent} from './taster-invites.component';
import {TasterInvitesDetailComponent} from './taster-invites-detail/taster-invites-detail.component';
import {TasterInvitesConfig} from './taster-invites.config';


export const TasterInvitesModule = angular
  .module('taster-invites',[])
  .component('tasterInvites', TasterInvitesComponent)
  .component('tasterInvitesDetail', TasterInvitesDetailComponent)
  .config(TasterInvitesConfig)
  .name;
