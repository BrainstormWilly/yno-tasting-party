export class HostService {
  constructor ($log, $q, $http, $state, constants, UserService) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.constants = constants;
    this.UserService = UserService;
  }

  getHostByUser(){
    let defer = this.$q.defer();
    this.UserService.getValidateUser()
      .then(user=>{
        this.$http.get(this.constants.apiUrl + "/hosts/user/" + user.id)
          .then(result=>{
            defer.resolve (result.data);
          })
          .catch(()=>{
            this.$state.go('taster-dashboard');
          });
      }).catch(()=>{
        this.$state.go('welcome');
      });
    // this.$log.log(result.promise);
    return defer.promise;
  }

}
