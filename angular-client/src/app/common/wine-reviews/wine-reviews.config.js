export function WineReviewsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('wine-reviews',{
      url: '/reviews',
      component: 'wineReviews',
      resolve: {
        reviews: WineReviewService => WineReviewService.index()
      }
    });

  $urlRouterProvider.otherwise('/');
}
