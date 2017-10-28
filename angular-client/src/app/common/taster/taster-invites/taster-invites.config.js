export function TasterInvitesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('taster-invites',{
      url: '/taster/:id/invites',
      component: 'tasterInvites',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    })
    .state('taster-invites-detail',{
      url: '/invites/:tasting_id',
      component: 'tasterInvitesDetail',
      resolve: {
        taster: ['TasterService', function(TasterService){ return TasterService.getTaster() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
