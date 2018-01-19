export function DashboardConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard',{
      url: '/dashboard',
      component:'dashboard',
      resolve:{
        taster: TasterService => TasterService.getTasterFromValidation()
      }
    });

  $urlRouterProvider.otherwise('/');

}
