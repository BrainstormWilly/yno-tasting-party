import {template} from './wine-list-item.es6';

export const WineListItemComponent = {
  bindings: {
    wine: "<",
    removeWine: "&",
    editWine: "&",
    editingWine: "<"
  },
  template,
  controller: class WineListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("TastingListItemComponent $onInit");
    }

  }
}
