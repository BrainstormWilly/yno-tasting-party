import {template} from './tasting-detail.es6';

export const TastingDetailComponent = {
  bindings: {
    tasting: "<"
  },
  template,
  controller: class TastingDetailController{
    constructor($log){
      'ngInject';
      this.$log = $log;
    }

    $onInit() {
      // this.$log.log("TastingDetailController $onInit");
    }

    // openDate(){
    //   return moment(this.tasting.open_at).format("MMM-D").toUpperCase();
    // }
    //
    // openTime(){
    //   return moment(this.tasting.open_at).format("LT");
    // }

  }
}
