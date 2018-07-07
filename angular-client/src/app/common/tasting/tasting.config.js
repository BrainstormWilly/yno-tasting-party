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
        tasterIsHost: function(taster, tasting){ return taster.id==tasting.host.taster.id },
        hostIsTasting: function(tasting, tasterIsHost){ return tasterIsHost && !tasting.host_is_not_tasting},
        tastingIsFrozen: function(tasting){ return tasting.is_closed || tasting.is_completed }
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
