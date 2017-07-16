import {TasterTastingsComponent} from './taster-tastings.component';
import {TasterTastingsConfig} from './taster-tastings.config';


export const TasterTastingsModule = angular
  .module('taster-tastings',[])
  .component('tasterTastings', TasterTastingsComponent)
  .config(TasterTastingsConfig)
  .name;
