import {template} from './nav.es6';

export const NavComponent = {
  bindings: {
    items: "<"
  },
  template,
  controller: class NavController{
    constructor($log, $state, $auth, UserService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.nav_state = false;
      this.UserService = UserService;
      this.TasterService = TasterService;
    }

    $onInit() {
      // this.$log.log("NavComponent $onInit", this.taster);
      // this.UserService.validateUser();
    }

    signOut(){
      this.UserService.signoutUser();
    }

  }
}
