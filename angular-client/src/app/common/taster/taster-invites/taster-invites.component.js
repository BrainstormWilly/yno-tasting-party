import {template} from './taster-invites.es6';

export const TasterInvitesComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterInvitesComponent{
    constructor($scope, $log, $state, TasterService, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.UserService = UserService;
      this.tastings = [];

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        this.taster = d;
        TasterService.loadInvites(d.id);
      });

      let invitesChangeEvent = $scope.$on('taster-invites-change-event', (e,d) => {
        if( d ){
          this.tastings = d;
        }else{
          this.$state.go('taster-dashboard');
        }
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        TasterService.loadTasterFromUser(d.id);
      });

      $scope.$on('$destroy', invitesChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
      $scope.$on('$destroy', userChangeEvent);
    }

    $onInit() {
      this.$log.log("TasterInvitesComponent $onInit");
      if( this.UserService.validationState()=="unvalidated" ){
        this.$state.go('welcome');
      }else if( this.taster ){
        this.TasterService.loadInvites(this.taster.id);
      }

    }

  }
}
