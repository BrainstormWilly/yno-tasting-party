import {DashboardModule} from './dashboard/dashboard.module.js';
import {TastingModule} from './tasting/tasting.module.js';
import {UserModule} from './user/user.module.js';
import {WelcomeModule} from './welcome/welcome.module.js';


export const CommonModule = angular
  .module('ynoTasting.common', [
    DashboardModule,
    WelcomeModule,
    TastingModule,
    UserModule
  ])
  .name;
