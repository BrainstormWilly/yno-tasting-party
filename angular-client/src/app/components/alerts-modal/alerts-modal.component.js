import {template} from './alerts-modal.es6';

export const AlertsModalComponent = {
  template,
  controller: class AlertsModalController{
    constructor($scope, $log, $element, AlertsService, ModalService){
      'ngInject';
      this.$log = $log;
      this.name = "alerts-modal";
      this.AlertsService = AlertsService;
      this.ModalService = ModalService;
      this.modalState = "closed";
      this.currentAlert = null;

      let $panel = $element.find(".main-modal-container");

      let modalStateChangeEvent = $scope.$on("modal-state-change-event", (e,d)=>{
        // this.$log.log("AlertsModalComponent.constructor", d);
        if(d.name==this.name ){

          if( d.state=="open" && this.modalState!="open"){
            this.modalState = d.state;
            TweenMax.to($element, 0.5, {autoAlpha:1});
            TweenMax.from($panel, 0.3, {transform:"scale(.5)"});
          }else if( d.state!="open" && this.modalState=="open" ){
            this.modalState = d.state;
            TweenMax.to($element, 0.5, {autoAlpha:0, onComplete:()=>{
              this.user = {};
              this.viewState = 1;
              this.result = {};
            }});
          }
        }
      });

      let setAlertsEvent = $scope.$on('set-alerts-event', (e,d)=>{
        // $log.log("AlertsModalComponent.constructor", d);
        this.currentAlert = d;
        this.ModalService.setModalState("open", this.name);
      });

      let endAlertsEvent = $scope.$on('end-alerts-event', ()=>{
        this.ModalService.setModalState("closed", this.name);
      });

      $scope.$on("$destroy", setAlertsEvent);
      $scope.$on("$destroy", endAlertsEvent);
      $scope.$on("$destroy", modalStateChangeEvent);
    }

    $onInit() {

      this.ModalService.registerModal(this);
      this.AlertsService.broadcastAlerts(); // need to guard against $onInit race conditions

    }

    closeModal(){
      this.AlertsService.dismissAlert(this.currentAlert.id);
      // this.ModalService.setModalState("closed", this.name);
    }

    confirmModal(){
      this.AlertsService.confirmAlert(this.currentAlert.id);
      // this.ModalService.setModalState("confirmed", this.name, this.currentAlert);
    }

  }
}
