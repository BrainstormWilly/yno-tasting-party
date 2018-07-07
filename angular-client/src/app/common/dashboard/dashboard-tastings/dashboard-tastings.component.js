import {template} from './dashboard-Tastings.es6';

export const DashboardTastingsComponent = {
  bindings:{
    taster: "<",
    tastings: "<"
  },
  template,
  controller: class DashboardTastingsController{
    constructor($log, $state, lodash)
    {
      'ngInject';

      this.$log = $log;
      this.$state = $state;
      this._ = lodash;
      this.message = "You have no tastings. Better host one yourself!";
    }

    $onInit(){
      if( this._.findIndex(this.tastings, "is_open")>-1 ){
        this.message = "You have an open tasting. Better get busy!";
      }else if( this._.findIndex(this.tastings, "is_pending")>-1 ){
        this.message = "You have a pending tasting! Better confirm it.";
      }else if( this.tastings.length>0 ){
        this.message = "Hmm, nothing currently going on. Time for some new tasting happiness!";
      }
    }

    selectTasting(tasting){
      this.$state.go("tasting-show",{id: tasting.id})
    }


  }
}
