import {template} from './notification.es6';

export const NotificationComponent = {
  template,
  controller: class NotificationController{
    constructor($scope, $log, $element, NotificationsService){

      'ngInject';
      this.$log = $log;
      this.$element = $element;
      this.NotificationsService = NotificationsService;
      this.message = "";

      // let $panel = $element.find(".main-modal-container");

      let setNotificationsEvent = $scope.$on("set-notifications-event", (e,d)=>{
        this.animateIn(d);

      });

      let endNotificationsEvent = $scope.$on("end-notifications-event", ()=>{
        // TweenMax.to($element, .3, {autoAlpha:0});
        this.animateOut();
      });

      $scope.$on("$destroy", setNotificationsEvent);
      $scope.$on("$destroy", endNotificationsEvent);
    }

    $onInit() {
      // this.$log.log("NotificationComponent.$oninit", this.NotificationsService.message);
      this.animateIn(this.NotificationsService.message)
    }

    animateIn(message){
      if( message ){
        this.message = message;
        TweenMax.fromTo(this.$element, .5, {top:"-4rem"}, {top:0, autoAlpha:1});
      }
    }

    animateOut(){
      TweenMax.to(this.$element, .5, {top:"-4rem", autoAlpha:0});
    }

  }
}
