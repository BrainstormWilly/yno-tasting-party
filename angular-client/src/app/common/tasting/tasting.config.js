export function TastingConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('tasting-show',{
      url: '/tastings/:id',
      component: 'tastingShow',
      resolve: {
        taster : TasterService => TasterService.getTasterFromValidation(),
        tasting: ($stateParams, TastingService) => {
          return TastingService.getTasting($stateParams.id)
        },
        tasterIsHost: function(taster, tasting){ return taster.id==tasting.host.taster.id }
      }
    })
    .state('tasting-list',{
      url: '/tastings/list/',
      component: 'tastingList',
      resolve: {
        taster: TasterService => TasterService.getTasterFromValidation(),
        tastings: TastingService => TastingService.getTastingList()
      }
    })
    .state('tasting-new',{
      url: '/tastings/new',
      component: 'tastingNew',
      resolve: {
        host: HostService => HostService.getHostFromValidation()
      }
    });

  $urlRouterProvider.otherwise('/');
}
