import {template} from './welcome-who.es6';

export const WelcomeWhoComponent = {
  template,
  controller: class WelcomeWhoController{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
    }
  }
}
