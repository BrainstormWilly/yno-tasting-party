import {template} from './guest-list-item.es6';

export const GuestListItemComponent = {
  bindings: {
    guest: "<"
  },
  template,
  controller: class GuestListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("TastingListItemComponent $onInit");
    }

  }
}
