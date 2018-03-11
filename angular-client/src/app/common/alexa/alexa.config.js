export function AlexaConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('alexa-signin',{
      url: '/alexa/signin',
      component: 'alexaSignin',
      resolve: {
        user: UserService => UserService.getUserByValidation()
      }
    });


  $urlRouterProvider.otherwise('/');
}
