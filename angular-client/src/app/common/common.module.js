import {WelcomeModule} from './welcome/welcome.module.js';
import {TasterDashboardModule} from './taster/taster-dashboard/taster-dashboard.module.js';
import {TasterTastingsModule} from './taster/taster-tastings/taster-tastings.module.js';
import {TastingModule} from './tasting/tasting.module.js';
// import {ReviewsModule} from './reviews/reviews.module.js';
// import {InvitesModule} from './invites/invites.module.js';

import {UserModule} from './user/user.module.js';


export const CommonModule = angular
  .module('ynoTasting.common', [
    WelcomeModule,
    TasterDashboardModule,
    TasterTastingsModule,
    TastingModule,
    UserModule
  ])
  .name;
