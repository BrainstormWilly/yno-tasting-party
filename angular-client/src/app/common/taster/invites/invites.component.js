import {template} from './invites.es6';

export const TasterInvitesComponent = {
  bindings: {
    taster: "<"
  },
  template,
  controller: class TasterInvitesController{
    constructor($scope, $log, $state, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.tastings = [];

      let invitesChangeEvent = $scope.$on('taster-invites-change-event', (e,d) => {
        if( d ){
          this.tastings = d;
        }else{
          this.$state.go('dashboard');
        }
      });

      $scope.$on('$destroy', invitesChangeEvent);
    }

    $onInit() {
      this.$log.log("TasterInvitesComponent $onInit");
      this.TasterService.loadInvites(this.taster.id)
    }

  }
}
