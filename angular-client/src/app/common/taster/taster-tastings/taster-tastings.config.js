export function TasterTastingsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('taster-tastings',{
      url: '/tasters/:id/tastings',
      component: 'tasterTastings',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
