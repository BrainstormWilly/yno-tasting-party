export class HostLocationService {
  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.constants = constants;
  }

  create(host_location){
    this.$http.post(this.constants.apiUrl + "/host_locations", host_location)
      .then(result=>{
        this.$rootScope.$broadcast("create-host-location-event", result.data);
      })
      .catch(err=>{
        this.$log.error("HostLocationService.create", err);
      })
  }

  update(host_location){
    this.$http.put(this.constants.apiUrl + "/host_locations/" + host_location.id, host_location)
      .then(result=>{
        this.$rootScope.$broadcast("update-host-location-event", result.data);
      })
      .catch(err=>{
        this.$log.error("HostLocationService.update", err);
      });
  }

  destroy(host_location_id){
    this.$http.delete(this.constants.apiUrl + "/host_locations/" + host_location_id)
      .then(result=>{
        this.$rootScope.$broadcast("destroy-host-location-event", result.data);
      })
      .catch(err=>{
        this.$log.error("HostLocationService.destroy", err);
      })
  }

}
