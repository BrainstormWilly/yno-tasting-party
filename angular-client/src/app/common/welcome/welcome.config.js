
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
    .state('welcome-how',{
      url: '/',
      component: 'welcomeHow'
    })
    .state('welcome-signin',{
      url: '/signin',
      component: 'welcomeSignin',
      resolve: {
        user: UserService => UserService.getUserByValidation()
      }
    })
    .state('welcome-signin-alexa',{
      url: '/signin/alexa',
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
    })
    .state('welcome-who',{
      url: '/who',
      component: 'welcomeWho'
    })
    .state('welcome-privacy',{
      url: '/privacy',
      component: 'welcomePrivacy'
    })
    .state('welcome-why',{
      url: '/why',
      component: 'welcomeWhy'
    });


  $urlRouterProvider.otherwise('/');
}
