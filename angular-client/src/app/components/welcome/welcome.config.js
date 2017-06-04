
export function WelcomeConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('welcome',{
      url: '/welcome',
      component: 'welcome',
      resolve: {
        msg: WelcomeService => WelcomeService.runRailsTest()
      }
    });
  $urlRouterProvider.otherwise('/');
}
