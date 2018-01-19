export class WineService {
  constructor ($log, $http, $q, $rootScope, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;

  }

  create(wine){
    this.$http.post(this.constants.apiUrl + "/wines", wine)
      .then(result=>{
        this.$rootScope.$broadcast("wine-create-event", result.data);
      })
      .catch(err=>{
        this.$log.error("WineService.create",err);
      })
  }

  show(wine_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/wines/" + wine_id)
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("WineService.show", err);
      });
    return defer.promise;
  }

}
