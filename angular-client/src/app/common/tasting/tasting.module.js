import {TastingShowComponent} from './tasting-show/tasting-show.component';
import {TastingNewComponent} from './tasting-new/tasting-new.component';
import {TastingConstants} from './tasting.constants';
import {TastingConfig} from './tasting.config';


export const TastingModule = angular
  .module('tasting',[])
  .component('tastingShow', TastingShowComponent)
  .component('tastingNew', TastingNewComponent)
  .constant('tastingConstants', TastingConstants)
  .config(TastingConfig)
  .name;
