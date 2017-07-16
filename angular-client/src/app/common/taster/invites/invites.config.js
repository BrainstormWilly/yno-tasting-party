export function TasterInvitesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('invites',{
      url: '/invites',
      views: {
        main: 'invites'
      },
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
