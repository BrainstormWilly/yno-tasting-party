export function TastingsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('tastings',{
      url: '/tastings',
      views: {
        main: 'tastings'
      },
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
