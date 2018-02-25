import {template} from './add-wine-modal.es6';

export const AddWineModalComponent = {
  bindings:{
    tasting: "<"
  },
  template,
  controller: class AddWineModalController{
    constructor($scope, $log, $element, ModalService, TastingWineService, WineService){
      'ngInject';
      this.$log = $log;
      this.name = "tasting-wine-modal";
      this.ModalService = ModalService;
      this.WineService = WineService;
      this.modalState = "closed";
      this.tastingWine = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        if(d.name==this.name ){
          if( d.state=="open" ){
            this.tastingWine = {
              tasting: this.tasting,
              tasting_id: this.tasting.id
            };
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            this.tastingWine = {};
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }
      });

      let createWineEvent = $scope.$on("wine-create-event", (e,d)=>{
        this.tastingWine.wine = d;
        this.tastingWine.wine_id = d.id;
        TastingWineService.create(this.tastingWine)
      });

      let createTastingWineEvent = $scope.$on("tasting-wine-create-event", (e,d)=>{
        this.tastingWine = d;
        this.confirmModal();
      })

      $scope.$on("destroy", modalStateChangeEvent);
      $scope.$on("destroy", createWineEvent);
      $scope.$on("destroy", createTastingWineEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
      // this.$log.log("TastingWineModalComponent.$onInit",this.tasting);
      // this.tastingWine.tasting = this.tasting;
      // this.tastingWine.tasting_id = this.tasting.id;
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.tastingWine);
    }

    createWine(){
      this.WineService.create(this.tastingWine.wine)
    }

  }
}
