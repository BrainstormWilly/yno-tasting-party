import {template} from './tasting-wine-list-item.es6';

export const TastingWineListItemComponent = {
  bindings: {
    tastingWine: "<",
    removeWine: "&",
    editable: "<"
  },
  template,
  controller: class TastingWineListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log(this.tastingWine);
      // this.$log.log("TastingListItemComponent $onInit");
    }
  }
}
