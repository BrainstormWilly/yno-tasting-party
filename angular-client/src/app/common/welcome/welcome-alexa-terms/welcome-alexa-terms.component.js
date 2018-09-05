import {template} from './welcome-alexa-terms.es6';

export const WelcomeAlexaTermsComponent = {
  template,
  controller: class WelcomeAlexaTermsController{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
    }
  }
}
