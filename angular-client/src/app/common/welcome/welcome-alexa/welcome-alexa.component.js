import {template} from './welcome-alexa.es6';

export const WelcomeAlexaComponent = {
  template,
  controller: class WelcomeAlexaController{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
    }
  }
}
