import {template} from './wine-info-modal.es6';


export const WineInfoModalComponent = {
  bindings:{
    wineType: "@"
  },
  template,
  controller: class WineInfoModalController{
    constructor($scope, $log, $element, ModalService){
      'ngInject';
      this.$log = $log;
      this.name = "wine-info-modal";
      this.ModalService = ModalService;
      this.modalState = "closed";
      // this.wine = null;
      // this.averageRating = 3;
      // this.averageRatingOverall = 3;
      // this.tasterAverageRatingOverall = 3;
      this.wineContext = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        // this.$log.log("WineInfoModalComponent.$onInit", this.wineType);
        if(d.name==this.name ){
          if( d.state=="open" ){
            // if( this.wineType=="tastingWine" ){
            //   // $log.log("WineInfoModalComponent.$onInit", d.data);
            //   this.wine = d.data.wine;
            //   this.averageRating = d.data.average_rating;
            // }else{
            //   $log.log("WineInfoModalComponent", d.data);
            //   this.wine = d.data.wine;
            //   this.averageRating = d.data.average_rating_overall;
            // }
            this.wineContext = d.data;
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.wine = null;
            this.averageRating = 3;
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {
      // this.$log.log("WineInfoModalComponent.$onInit", this.wineType);
      if( !this.wineType ) this.wineType = "wine";
      this.ModalService.registerModal(this);
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(data){
      this.ModalService.setModalState("confirmed", this.name, data);
    }

  }
}
