export class WelcomeService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  runTest(){
    return {title: "Welcome Service Test Complete"}
  }
  runRailsTest() {
    return this.$http.get('/api/tests').then(response => response.data);
  }
}
