import {template} from './taster-invites-detail.es6';

export const TasterInvitesDetailComponent = {
  bindings: {
    $transition$: "<",
    taster: "<"
  },
  template,
  controller: class TasterInvitesDetailController{
    constructor($scope, $log, $state, TasterService, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.UserService = UserService;
      this.tasting = {};

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        this.taster = d;
        TasterService.loadInviteTasting(this.taster.id, this.$transition$.params("to").tasting_id);
      });

      let tasterInviteTastingChangeEvent = $scope.$on('taster-invite-tasting-change-event', (e,d) => {
        if( d ){
          // this.$log.log(moment().format(d.open_at,"LLL"));
          this.tasting = d;
          this.tasting.openAt = moment(d.open_at).format("LLL");
        }else{
          this.$state.go('taster-dashboard');
        }
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        TasterService.loadTasterFromUser(d.id);
      });

      $scope.$on('$destroy', tasterInviteTastingChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
      $scope.$on('$destroy', userChangeEvent);
    }

    $onInit() {
      this.$log.log("TasterInvitesDetailComponent $onInit");
      if( this.UserService.validationState()=="unvalidated" ){
        this.$state.go('welcome');
      }else if( this.taster ){
        this.TasterService.loadInviteTasting(this.taster.id, this.$transition$.params("to").tasting_id);
      }

    }

    approveInvite(){
      this.$log.log(this.tasting.id);
    }

  }
}
