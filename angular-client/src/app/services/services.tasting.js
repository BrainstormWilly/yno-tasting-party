export class TastingService {

  constructor ($log, $http, $q, $rootScope, $state, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
  }

  /* deprecate in favor of getTasting() */
  // loadTasting(tasting){
  //   this.$http.get(this.constants.apiUrl + "/tastings/" + tasting)
  //     .then(tasting => {
  //       this.setTasting(tasting.data);
  //     })
  //     .catch(error => {
  //       this.$log.error(error);
  //     });
  // }

  createTasting(tasting){
    this.$http.post(this.constants.apiUrl + "/tastings", tasting)
      .then(result=>{
        this.$rootScope.$broadcast("create-tasting-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TastingService.createTasting", err);
      });
  }

  destroyTasting(tasting_id){
    this.$http.delete(this.constants.apiUrl + "/tastings/" + tasting_id)
      .then(()=>{
        // this.$rootScope.$broadcast("destroy-tasting-event", result.data);
        this.$state.go("dashboard");
      })
      .catch(err=>{
        this.$log.error("TastingService.destroyTasting", err);
      })
  }

  updateTasting(tasting){
    tasting.open_at = moment(tasting.open_at).utc();
    if( tasting.close_at ) tasting.close_at = moment(tasting.close_at).utc();
    if( tasting.closed_at ) tasting.closed_at = moment(tasting.closed_at).utc();
    if( tasting.completed_at ) tasting.completed_at = moment(tasting.completed_at).utc();
    this.$http.put(this.constants.apiUrl + "/tastings/" + tasting.id, tasting)
      .then(result=>{
        this.$rootScope.$broadcast("update-tasting-event", result.data);
      })
      .catch(err=>{
        this.$log.error("TastingService.updateTasting", err);
      });
  }

  getTasting(tasting_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/tastings/" + tasting_id)
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(()=>{
        // this.$log.error("TastingService.getTasting", err);
        this.$state.go("dashboard");
      });
    return defer.promise;
    // return this.$http.get(this.constants.apiUrl + "/tastings/" + tasting_id);
  }

  refreshTasting(tasting_id){
    this.$http.get(this.constants.apiUrl + "/tastings/" + tasting_id)
      .then(result=>{
        this.$rootScope.$broadcast("tasting-refresh-event", result.data);
      })
      .catch(()=>{
        // die silently
      });
  }

  getTastingList(){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/tastings/")
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("TastingService.getTastingList", err);
      });
    return defer.promise;
  }

  // setTasting(tasting){
  //   this.tasting = tasting;
  //   this.$rootScope.$broadcast('tasting-change-event', tasting);
  // }
  // getTasting(){
  //   return this.tasting;
  // }

}
