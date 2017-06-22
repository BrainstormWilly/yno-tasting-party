
export function WelcomeConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('welcome',{
      url: '/',
      views: {
        main: 'welcome'
      }
    })
    .state('welcome-signin',{
      url: '/signin',
      views: {
        main: 'welcomeSignin'
      }
    });

  $urlRouterProvider.otherwise('/');
}
