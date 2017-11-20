export class WineService {
  constructor ($log, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;

  }

  createWine(wine){
    return this.$http.post(this.constants.apiUrl + "/wines", wine);
  }

}
