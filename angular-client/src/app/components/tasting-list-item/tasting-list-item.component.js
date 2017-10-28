import {template} from './tasting-list-item.es6';

export const TastingListItemComponent = {
  bindings: {
    tasting: "<"
  },
  template,
  controller: class TastingListItemController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("TastingListItemComponent $onInit");
    }

    openDate(){
      // if( this.tasting.is_open ) return "Open Now!"
      return moment(this.tasting.open_at).format("MMM-D").toUpperCase();
    }

    openTime(){
      return moment(this.tasting.open_at).format("LT");
    }

  }
}
