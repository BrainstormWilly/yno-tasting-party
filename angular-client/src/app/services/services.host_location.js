export class HostLocationService {
  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.constants = constants;
  }

  createLocation(params){
    return this.$http.post(this.constants.apiUrl + "/host_locations", params)
  }

}
