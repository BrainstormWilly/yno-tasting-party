export function UserConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('user',{
      url: '/user',
      views: {
        main: 'user'
      },
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
