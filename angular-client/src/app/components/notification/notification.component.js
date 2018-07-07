import {template} from './notification.es6';

export const NotificationComponent = {
  template,
  controller: class NotificationController{
    constructor($scope, $log, $element, NotificationsService){

      'ngInject';
      this.$log = $log;
      this.$element = $element;
      this.NotificationsService = NotificationsService;
      this.message = null;

      // let $panel = $element.find(".main-modal-container");

      let setNotificationsEvent = $scope.$on("set-notifications-event", (e,d)=>{
        this.message = d;

      });

      let endNotificationsEvent = $scope.$on("end-notifications-event", ()=>{
        this.message = null;
      });

      $scope.$on("$destroy", setNotificationsEvent);
      $scope.$on("$destroy", endNotificationsEvent);
    }

    $onInit() {
      // this.$log.log("NotificationComponent.$oninit", this.NotificationsService.message);
      this.message = this.NotificationsService.message;
    }

  }
}
