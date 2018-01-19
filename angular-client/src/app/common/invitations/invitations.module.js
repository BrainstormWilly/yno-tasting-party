import {InvitationsComponent} from './invitations.component';
import {InvitationsConfig} from './invitations.config';


export const InvitationsModule = angular
  .module('invitations', [])
  .component('invitations', InvitationsComponent)
  .config(InvitationsConfig)
  .name;
