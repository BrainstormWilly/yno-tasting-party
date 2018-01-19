export class TasterService {
  constructor ($rootScope, $log, $http, $auth, $q, $state, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.$q = $q;
    this.$state = $state;
  }

  // approveInvite(taster, tasting){
  //   this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/approve_invite/" + tasting)
  //     .then(() => {
  //       // go to dashboard
  //     })
  //     .catch(error => {
  //       this.$log.error(error);
  //     });
  // }
  getTasterFromValidation(){
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
          .catch(err=>{
            this.$log.error("TasterService: getTaster", err);
            this.$state.go("dashboard");
          })
      })
      .catch(err => {
        this.$log.error("TasterService: validateUser", err);
        this.$state.go("welcome");
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
    this.$http.put(this.constants.apiUrl + "/tasters/" + taster.id, taster)
      .then(result=>{
        this.$rootScope.$broadcast("taster-update-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TasterService.update", err);
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
      .catch(error => {
        this.$log.error("TasterService.signupTaster", error);
      })
  }


}
