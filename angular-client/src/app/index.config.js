export function IndexConfig($authProvider, $stateProvider) {
  'ngInject';
  $authProvider
    .configure({
      apiUrl: '/api/v1'
    });
  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl:
    })

}
