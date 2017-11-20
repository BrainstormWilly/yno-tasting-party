export function TasterConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('taster-dashboard',{
      url: '/taster/dashboard',
      component:'tasterDashboard',
      resolve:{
        taster: TasterInitialData => TasterInitialData.getTaster()
      }
    });

  $urlRouterProvider.otherwise('/');

}
