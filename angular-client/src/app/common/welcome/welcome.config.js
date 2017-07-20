
export function WelcomeConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('welcome',{
      url: '/',
      component: 'welcome'
    })
    .state('welcome-signin',{
      url: '/signin',
      component: 'welcomeSignin'
    })
    .state('welcome-signup',{
      url: '/signup',
      component: 'welcomeSignup'
    });


  $urlRouterProvider.otherwise('/');
}
