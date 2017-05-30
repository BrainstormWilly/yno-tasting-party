angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: function ($http: angular.IHttpService) { // eslint-disable-line babel/object-shorthand
      this.hello = 'Hello World!';

      // $http.get('/api/hello').then(function() {
      //   // do nothing
      // });
    }
  });
