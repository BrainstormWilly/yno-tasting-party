import {TastingComponent} from './tasting.component';
import {TastingConfig} from './tasting.config';


export const TastingModule = angular
  .module('tasting',[])
  .component('tasting', TastingComponent)
  .config(TastingConfig)
  .name;
