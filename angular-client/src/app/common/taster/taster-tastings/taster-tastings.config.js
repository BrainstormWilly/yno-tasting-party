export function TasterTastingsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('taster-tastings',{
      url: '/tasters/:id/tastings',
      component: 'tasterTastings',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }],
        tastings: ['TasterService', function(TasterService){ return TasterService.getTastings() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
