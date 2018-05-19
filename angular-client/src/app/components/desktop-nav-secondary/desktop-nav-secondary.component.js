import {template} from './desktop-nav-secondary.es6';

export const DesktopNavSecondaryComponent = {
  bindings:{
    welcomeState: "<",
    howState: "<",
    signoutState: "<"
  },
  template,
  controller: class DesktopNavSecondaryController{
    constructor($state, $log, welcomeConstants){
      'ngInject';
      this.$state = $state;
      this.$log = $log;
      this.constants = welcomeConstants;

    }


  }

}
