export class TastingService {

  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.tasting = null;
  }

  loadTasting(tasting){
    this.$http.get(this.constants.apiUrl + "/tastings/" + tasting)
      .then(tasting => {
        this.setTasting(tasting.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  setTasting(tasting){
    this.tasting = tasting;
    this.$rootScope.$broadcast('tasting-change-event', tasting);
  }
  getTasting(){
    return this.tasting;
  }

}
