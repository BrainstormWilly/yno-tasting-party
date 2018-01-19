import {template} from './welcome-accept-invite.es6';

export const WelcomeAcceptInviteComponent = {
  bindings: {
    token: "<"
  },
  template,
  controller: class WelcomeAcceptInviteController{
    constructor($scope, $log, $state, TasterService, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.UserService = UserService;
      this.taster = {
        user:{}
      };

      let tasterUpdateEvent = $scope.$on("taster-update-event", ()=>{
        this.$state.go("invitations");
      });

      $scope.$on("$destroy", tasterUpdateEvent);
    }

    $onInit() {
      this.taster.user.invitation_token = this.token
    }

    acceptInvite(){
      this.UserService.acceptInvite(this.taster.user)
        .then(user=>{
          this.taster.id = user.taster.id;
          this.TasterService.update(this.taster);
        });
    }

  }
}
