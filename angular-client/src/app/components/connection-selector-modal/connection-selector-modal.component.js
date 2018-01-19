import {template} from './connection-selector-modal.es6';

export const ConnectionSelectorModalComponent = {
  bindings:{
    host: "<"
  },
  template,
  controller: class ConnectionSelectorModalController{
    constructor($scope, $log, $element, $rootScope, ModalService){
      'ngInject';
      this.$log = $log;
      this.name = "connnection-selector-modal";
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.connections = [];

      let $panel = $element.find(".main-modal-container");
      let modalStateChangeEvent = $rootScope.$on("modal-state-change-event", (e,d)=>{
        if( d.name==this.name ){
          this.modalState = d.state;
          if( d.state=="open" ){
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else{
            TweenMax.to($element, 0.5, {autoAlpha:0})
          }
        }
      });

      $scope.$on("destroy", modalStateChangeEvent);


    }

    $onInit() {
      this.ModalService.registerModal(this);
      this.connections = angular.copy(this.host.connections);
    }

    selectConnection(connection){
      connection.selected = true;
      this.ModalService.setModalState("confirmed", this.name, connection);
    }

  }
}
