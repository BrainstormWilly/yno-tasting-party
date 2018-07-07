export function DashboardConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard',{
      url: '/dashboard',
      component:'dashboard',
      resolve:{
        taster: TasterService => TasterService.getTasterFromValidation()
      }
    })
    .state('dashboard-tastings',{
      url: '/dashboard/tastings',
      component: 'dashboardTastings',
      resolve: {
        taster: TasterService => TasterService.getTasterFromValidation(),
        tastings: TastingService => TastingService.getTastingList()
      }
    })
    .state('dashboard-reviews',{
      url: '/dashboard/reviews',
      component: 'dashboardReviews',
      resolve: {
        taster: TasterService => TasterService.getTasterFromValidation(),
        reviews: WineReviewService => WineReviewService.index()
      }
    })
    .state('dashboard-invitations',{
      url: '/dashboard/invitations',
      component: 'dashboardInvitations',
      resolve: {
        taster: TasterService => TasterService.getTasterFromValidation(),
        invitations: GuestService => GuestService.getInvitations()
      }
    });

  $urlRouterProvider.otherwise('/');

}
