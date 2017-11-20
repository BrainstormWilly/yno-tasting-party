import {TastingComponent} from './tasting.component';
import {TastingNewComponent} from './tasting-new/tasting-new.component';
import {TastingConfig} from './tasting.config';


export const TastingModule = angular
  .module('tasting',[])
  .component('tasting', TastingComponent)
  .component('tastingNew', TastingNewComponent)
  .config(TastingConfig)
  .name;
