import {TastingShowComponent} from './tasting-show/tasting-show.component';
import {TastingNewComponent} from './tasting-new/tasting-new.component';
import {TastingConfig} from './tasting.config';


export const TastingModule = angular
  .module('tasting',[])
  .component('tastingShow', TastingShowComponent)
  .component('tastingNew', TastingNewComponent)
  .config(TastingConfig)
  .name;
