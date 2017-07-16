import {TasterDashboardComponent} from './taster-dashboard.component';
import {TasterDashboardConfig} from './taster-dashboard.config';


export const TasterDashboardModule = angular
  .module('taster-dashboard',[])
  .component('tasterDashboard', TasterDashboardComponent)
  .config(TasterDashboardConfig)
  .name;
