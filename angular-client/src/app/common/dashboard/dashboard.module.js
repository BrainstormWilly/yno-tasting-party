import {DashboardConfig} from './dashboard.config';
import {DashboardComponent} from './dashboard.component';
import {DashboardTastingsComponent} from './dashboard-tastings/dashboard-tastings.component';
import {DashboardReviewsComponent} from './dashboard-reviews/dashboard-reviews.component';


export const DashboardModule = angular
  .module('dashboard', [])
  .component('dashboard', DashboardComponent)
  .component('dashboardTastings', DashboardTastingsComponent)
  .component('dashboardReviews', DashboardReviewsComponent)
  .config(DashboardConfig)
  .name;
