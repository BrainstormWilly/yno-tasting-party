
export function WelcomeConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('welcome',{
      url: '/',
      component: 'welcome',
      resolve: {
        user: UserService => UserService.getUserByValidation()
      }
    })
    .state('welcome-signin',{
      url: '/signin',
      component: 'welcomeSignin',
      resolve: {
        user: UserService => UserService.getUserByValidation()
      }
    })
    .state('welcome-signup',{
      url: '/signup',
      component: 'welcomeSignup',
      resolve: {
        user: UserService => UserService.getUserByValidation()
      }
    })
    .state('welcome-accept-invite',{
      url: '/user/accept_invite/:invitation_token',
      component: 'welcomeAcceptInvite',
      resolve: {
        token: ($stateParams) =>{
          return $stateParams.invitation_token
        }
      }
    });


  $urlRouterProvider.otherwise('/');
}
