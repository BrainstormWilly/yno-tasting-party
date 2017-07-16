export function TasterDashboardConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('taster-dashboard',{
      url: '/taster/:id/dashboard',
      component:'tasterDashboard',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
