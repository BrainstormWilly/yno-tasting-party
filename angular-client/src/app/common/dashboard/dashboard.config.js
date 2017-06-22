export function DashboardConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard',{
      url: '/dashboard',
      views: {
        main: 'dashboard'
      },
      resolve: {
        user: ['UserService', function(UserService){ return UserService.getUser() }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
