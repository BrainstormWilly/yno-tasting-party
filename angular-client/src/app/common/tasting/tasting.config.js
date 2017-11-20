export function TastingConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('tasting',{
      url: '/tastings/:id',
      component: 'tasting'
    })
    .state('tasting-new',{
      url: '/tastings/new',
      component: 'tastingNew',
      resolve: {
        host: HostService => HostService.getHostByUser()
      }
    });

  $urlRouterProvider.otherwise('/');
}
