import {WelcomeModule} from './welcome/welcome.module.js';
import {DashboardModule} from './dashboard/dashboard.module.js';
import {TastingsModule} from './tastings/tastings.module.js';
import {ReviewsModule} from './reviews/reviews.module.js';
import {InvitesModule} from './invites/invites.module.js';


export const CommonModule = angular
  .module('ynoTasting.common', [
    WelcomeModule,
    DashboardModule,
    TastingsModule,
    ReviewsModule,
    InvitesModule
  ])
  .name;
