export class NotificationsService {
  constructor ($log, $rootScope, $interval) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$interval = $interval;
    this.displayTimer = null;
    this.message = null;

  }

  endNotification(scope){
    scope.$rootScope.$broadcast('end-notifications-event');
    scope.message = null;
  }

  setNotification(message){
    if( this.message ){
      this.$interval.cancel(this.displayTimer);
    }
    this.message = message;
    this.displayTimer = this.$interval(this.endNotification, 4000, 1, true, this);
    this.$rootScope.$broadcast('set-notifications-event', message);
  }

}
