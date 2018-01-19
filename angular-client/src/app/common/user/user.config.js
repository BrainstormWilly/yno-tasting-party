export function UserConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('user',{
      url: '/user',
      component: 'user',
      resolve:{
        raw_user: UserService => UserService.getUserByValidation(),
        user: (raw_user, UserService) => UserService.show(raw_user.id)
      }
    })
    .state('user-host',{
      url: '/host',
      component: 'userHost',
      resolve:{
        taster: TasterService => TasterService.getTasterFromValidation()
      }
    });


  $urlRouterProvider.otherwise('/');
}
