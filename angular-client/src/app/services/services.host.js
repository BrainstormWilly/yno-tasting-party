export class HostService {
  constructor ($auth, $log, $q, $http, $state, $rootScope, constants, UserService) {
    'ngInject';

    this.$auth = $auth;
    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.constants = constants;
    this.UserService = UserService;
  }

  getHostFromValidation(){
    let defer = this.$q.defer();
    this.$auth.validateUser()
      .then(user => {
        this.$http.get(this.constants.apiUrl + "/hosts/user/" + user.id)
          .then(result=>{
            defer.resolve(result.data);
          })
          .catch(()=>{
            // this.$log.error("HostService.getHostFromValidation", err);
            this.$state.go("user-host");
          });
      })
      .catch(err => {
        this.$log.error("HostService.getHostFromValidation", err);
        this.$state.go("welcome");
      });
    return defer.promise;
  }

  create(host){
    this.$http.post(this.constants.apiUrl + "/hosts", host)
      .then(result=>{
        this.$rootScope.$broadcast("host-create-event", result.data);
      })
      .catch(err=>{
        this.$log.error("HostService.create", err);
      })
  }



}
