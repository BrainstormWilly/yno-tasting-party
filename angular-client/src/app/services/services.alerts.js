export class AlertsService {
  constructor ($log, $rootScope) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.alerts = [];
    this.alertIndex = 0;
  }

  broadcastAlerts(){
    for(let i=0; i<this.alerts.length; i++){
      this.$rootScope.$broadcast('set-alerts-event', this.alerts[i]);
    }
  }

  setFailureAlert(message){
    let alert = {
      id: this.alertIndex++,
      type: "failure",
      message: message
    };
    this.alerts.push(alert);
    this.$rootScope.$broadcast('set-alerts-event', alert);
  }

  setWarningAlert(message, code, data){
    let alert = {
      id: this.alertIndex++,
      type: "warning",
      message: message,
      code: code,
      data: data
    };
    this.alerts.push(alert);
    this.$rootScope.$broadcast('set-alerts-event', alert);
  }

  setConfirmationAlert(message){
    let alert = {
      id: this.alertIndex++,
      type: "confirmation",
      message: message
    };
    this.alerts.push(alert);
    // this.$log.log("AlertsService.setConfirmationAlert");
    this.$rootScope.$broadcast('set-alerts-event', alert);
  }

  dismissAlert(id){
    let alert = null;
    for( let i=0; i<this.alerts.length; i++ ){
      if( this.alerts[i].id==id ){
        alert = this.alerts[i];
        alert.action = "dismiss";
        this.alerts.splice(i,1);
        break;
      }
    }
    if( alert ){
      this.$rootScope.$broadcast('end-alerts-event', alert);
    }
  }

  confirmAlert(id){
    let alert = null;
    for( let i=0; i<this.alerts.length; i++ ){
      if( this.alerts[i].id==id ){
        alert = this.alerts[i];
        alert.action = "confirm";
        this.alerts.splice(i,1);
        break;
      }
    }
    if( alert ){
      this.$rootScope.$broadcast('end-alerts-event', alert);
    }
  }

  denyAlert(id){
    let alert = null;
    for( let i=0; i<this.alerts.length; i++ ){
      if( this.alerts[i].id==id ){
        alert = this.alerts[i];
        alert.action = "deny";
        this.alerts.splice(i,1);
        break;
      }
    }
    if( alert ){
      this.$rootScope.$broadcast('end-alerts-event', alert);
    }
  }



}
