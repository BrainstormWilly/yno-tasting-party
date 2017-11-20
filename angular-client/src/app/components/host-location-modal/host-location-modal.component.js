import {template} from './host-location-modal.es6';

export const HostLocationModalComponent = {
  bindings: {
    hostLocations: "<"
  },
  template,
  controller: class HostLocationModalController{
    constructor($scope, $log, $element, $rootScope, ModalService, HostLocationService){
      'ngInject';

      this.$log = $log;
      this.$element = $element;
      this.name = "host-location-modal";
      this.ModalService = ModalService;
      this.HostLocationService = HostLocationService;
      this.modalState = "closed";
      this.selected_host_location = null;
      this.new_location = {};
      this.state = 1;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if( d.name==this.name ){
          this.modalState = d.state;
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0});
          }
        }else if (d.name=="state-selector-modal") {
          if( d.state=="confirmed"){
            this.new_location.state = d.data.code;
          }
        }
      });

      $scope.$on("destroy", modalStateChangeEvent);
    }

    $onInit() {
      this.ModalService.registerModal(this);
      for( let i=0; i<this.hostLocations.length; i++ ){
        if( this.hostLocations[i].selected ){
          this.selected_host_location = this.hostLocations[i];
          break;
        }
      }
    }

    openStateSelector(){
      this.ModalService.setModalState("open", "state-selector-modal");
    }

    closeModal(){
      this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.ModalService.setModalState("confirmed", this.name, this.selected_host_location);
    }

    addLocation(){
      this.HostLocationService.createLocation({location:this.new_location})
        .then(result=>{
          this.new_location = {};
          this.selected_host_location = result.data;
          this.state = 1;
          this.confirmModal(result.data);
        })
        .catch(err=>{
          this.$log.error(err);
        })
    }

  }
}
