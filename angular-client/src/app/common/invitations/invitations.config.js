export function InvitationsConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('invitations',{
      url: '/invitations',
      component:'invitations',
      resolve:{
        taster: TasterService => TasterService.getTasterFromValidation(),
        invitations: GuestService => GuestService.getInvitations()
      }
    });

  $urlRouterProvider.otherwise('/');

}
