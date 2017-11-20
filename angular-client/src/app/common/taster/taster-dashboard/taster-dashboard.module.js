import {TasterDashboardComponent} from './taster-dashboard.component';


export const TasterDashboardModule = angular
  .module('taster-dashboard',[])
  .component('tasterDashboard', TasterDashboardComponent)
  .name;
