export class TastingWineService {
  constructor ($log, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;

  }

  createWine(tasting_wine){
    return this.$http.post(this.constants.apiUrl + "/tasting_wines/create_for_tasting", tasting_wine);
  }

}
