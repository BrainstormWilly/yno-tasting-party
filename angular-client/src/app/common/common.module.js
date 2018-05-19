import {DashboardModule} from './dashboard/dashboard.module.js';
import {InvitationsModule} from './invitations/invitations.module.js';
import {TastingModule} from './tasting/tasting.module.js';
// import {ReviewsModule} from './reviews/reviews.module.js';
// import {InvitesModule} from './invites/invites.module.js';

import {UserModule} from './user/user.module.js';
import {WelcomeModule} from './welcome/welcome.module.js';


export const CommonModule = angular
  .module('ynoTasting.common', [
    DashboardModule,
    InvitationsModule,
    WelcomeModule,
    TastingModule,
    UserModule
  ])
  .name;
