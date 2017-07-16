export function TastingConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('tasting',{
      url: '/tastings/:id',
      component: 'tasting',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
