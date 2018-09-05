export class TasterService {
  constructor ($rootScope, $log, $http, $auth, $q, $state, constants, AlertsService) {
    'ngInject';

    this.constants = constants;
    this.AlertsService = AlertsService;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$q = $q;
    this.$state = $state;
  }

  sendContactUs(message, taster){
    this.$http.put(this.constants.apiUrl + "/tasters/" + taster + "/contact_us", {message: message})
      .then(result => {
        this.AlertsService.setConfirmationAlert(result.data.message);
      })
  }

  getTasterFromValidation(redirect=true){
    let defer = this.$q.defer();
    this.$auth.validateUser()
      .then(user => {
        this.$http.get(this.constants.apiUrl + "/tasters/user/" + user.id)
          .then(result=>{
            if( result.data.status=="inactive" ){
              this.$state.go("user");
            }else{
              defer.resolve(result.data);
            }
          })
          .catch(()=>{
            // this.$log.error("TasterService: getTaster", err);
            defer.resolve(null)
            if(redirect) this.$state.go("welcome");
          })
      })
      .catch(() => {
        // this.$log.error("TasterService: validateUser", err);
        // defer.reject("no authorized taster")
        defer.resolve(null)
        if(redirect) this.$state.go("welcome");
      });
    return defer.promise;
  }

  // createTaster(taster){
  //   return this.$http.post(this.constants.apiUrl + "/tasters", taster);
  // }

  getTasterFromUser(user_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/tasters/user/" + user_id)
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("TasterService.getTasterFromUser", err);
      });
    return defer.promise;
  }

  update(taster){
    this.$rootScope.$broadcast("service-init-event");
    this.$http.put(this.constants.apiUrl + "/tasters/" + taster.id, taster)
      .then(result=>{
        this.$rootScope.$broadcast("taster-update-event", result.data);
      })
      .catch(()=>{
        this.AlertsService.setFailureAlert("There was an error in updating taster. Please try later.");
      })
      .finally(()=>{
        this.$rootScope.$broadcast("service-complete-event");
      })
  }

  loadTaster(taster){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster)
      .then(taster => {
        this.setTaster(taster.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  signupTaster(taster){
    // this.$log.log(taster);
    this.$http.post(this.constants.apiUrl + "/tasters", {taster: taster})
      .then(() => {
        this.$state.go("dashboard");
      })
      .catch(() => {
        this.AlertsService.setFailureAlert("There was an error in taster sign up. Please try later.");
      })
  }


}
