import {template} from './footer-menu.es6';

export const FooterMenuComponent = {
  template,
  controller: class FooterMenuController{
    constructor($log, $state, $auth, UserService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.nav_state = false;
      this.UserService = UserService;
    }

    $onInit() {
      // this.$log.log("FooterMenuComponent $onInit");
      // this.UserService.validateUser();
    }

    signOut(){
      this.UserService.signoutUser();
    }

  }
}
