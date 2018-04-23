import {template} from './welcome-how.es6';

export const WelcomeHowComponent = {
  template,
  controller: class WelcomeHowController{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
    }
  }
}
