
import {TasterConfig} from './taster.config';
import {TasterTastingsModule} from './taster-tastings/taster-tastings.module';
import {TasterInvitesModule} from './taster-invites/taster-invites.module';
import {TasterDashboardModule} from './taster-dashboard/taster-dashboard.module';
// import {TasterReviewsModule} from './tastings/reviews.module';


export const TasterModule = angular
  .module('taster', [
    TasterDashboardModule,
    TasterTastingsModule,
    TasterInvitesModule
  ])
  .config(TasterConfig)
  .name;
