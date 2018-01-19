import {template} from './connection-list-item.es6';

export const ConnectionListItemComponent = {
  bindings:{
    connection: "<",
    selectAction: "&",
    taster: "<"
  },
  template,
  controller: class ConnectionListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {

    }

  }
}
