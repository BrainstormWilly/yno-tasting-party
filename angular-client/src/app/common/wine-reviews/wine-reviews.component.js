import {template} from './wine-reviews.es6';

export const WineReviewsComponent = {
  bindings: {
    reviews: "<"
  },
  template,
  controller: class WineReviewsController{
    constructor($scope, $log, $state, ModalService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.ModalService = ModalService;
      this.sortFields = [
        {name:"Rating", code:"rating", selected:true},
        {name:"Name", code:"wine.full_name"},
        {name:"Date", code:"updated_at"}
      ];
      this.sortField = "rating";
      this.sortDesc = true;
    }

    $onInit() {
      // this.$log.log("WineReviewsComponent.$onInit", this.reviews);

    }

    changeSorting(field){
      for( let i=0; i<this.sortFields.length; i++ ){
        this.sortFields[i].selected = false;
      }
      field.selected = true;
      this.sortField = field.code;
      // if( this.sortField=="wine.full_name" ){
      //   this.sortDesc = false;
      // }else{
      //   this.sortDesc = true;
      // }
    }

    openWineModal(review){
      this.ModalService.setModalState("open", "wine-info-modal", review.wine);
    }

  }
}
