export class LocationService {
  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.constants = constants;
  }

  create(location){
    this.$http.post(this.constants.apiUrl + "/locations", location)
      .then(result=>{
        this.$rootScope.$broadcast("create-location-event", result.data);
      })
      .catch(err=>{
        this.$log.error("LocationService.create", err);
      })
  }

}
