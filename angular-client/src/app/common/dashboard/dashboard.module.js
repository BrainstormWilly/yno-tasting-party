import {DashboardComponent} from './dashboard.component';
import {DashboardConfig} from './dashboard.config';


export const DashboardModule = angular
  .module('dashboard',[])
  .component('dashboard', DashboardComponent)
  .config(DashboardConfig)
  .name;
