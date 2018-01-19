import {DashboardConfig} from './dashboard.config';
import {DashboardComponent} from './dashboard.component';


export const DashboardModule = angular
  .module('dashboard', [])
  .component('dashboard', DashboardComponent)
  .config(DashboardConfig)
  .name;
