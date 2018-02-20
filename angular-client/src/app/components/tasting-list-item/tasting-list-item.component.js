import {template} from './tasting-list-item.es6';

export const TastingListItemComponent = {
  bindings: {
    tasting: "<",
    editable: "<",
    selectAction: "&"
  },
  template,
  controller: class TastingListItemController{
    constructor($log, $state){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
    }

    $onInit() {
      // this.$log.log(this.tasting);
    }

    // showTasting(){
    //   this.$state.go("tasting-show",{id: this.tasting.id})
    // }


  }
}
