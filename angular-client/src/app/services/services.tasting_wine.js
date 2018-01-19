export class TastingWineService {
  constructor ($log, $rootScope, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;

  }

  create(tasting_wine){
    this.$http.post(this.constants.apiUrl + "/tasting_wines", tasting_wine)
      .then(result=>{
        this.$rootScope.$broadcast("tasting-wine-create-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TastingWineService.create", err);
      })
  }

  update(tasting_wine){
    this.$http.put(this.constants.apiUrl + "/tasting_wines/" + tasting_wine.id, tasting_wine)
      .then(result=>{
        this.$rootScope.$broadcast("tasting-wine-update-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TastingWineService.update", err);
      })
  }

  destroy(tasting_wine){
    this.$http.delete(this.constants.apiUrl + "/tasting_wines/" + tasting_wine.id)
      .then(result=>{
        this.$rootScope.$broadcast("tasting-wine-destroy-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TastingWineService.destroy", err);
      })
  }

}
