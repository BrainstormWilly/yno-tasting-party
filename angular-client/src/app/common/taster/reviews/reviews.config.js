export function TasterReviewsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('reviews',{
      url: '/reviews',
      views: {
        main: 'reviews'
      },
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
