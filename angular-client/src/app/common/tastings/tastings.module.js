import {TastingsComponent} from './tastings.component';
import {TastingsConfig} from './tastings.config';


export const TastingsModule = angular
  .module('tastings',[])
  .component('tastings', TastingsComponent)
  .config(TastingsConfig)
  .name;
