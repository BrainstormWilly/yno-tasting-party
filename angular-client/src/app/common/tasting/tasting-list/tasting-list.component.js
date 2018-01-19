import {template} from './tasting-list.es6';

export const TastingListComponent = {
  bindings:{
    taster: "<",
    tastings: "<"
  },
  template,
  controller: class TastingListController{
    constructor($log, $state)
    {
      'ngInject';

      this.$log = $log;
      this.$state = $state;

    }

    $onInit(){
      // this.$log.log(this.tastings[0]);
    }

    selectTasting(tasting){
      this.$state.go("tasting-show",{id: tasting.id})
    }


  }
}
