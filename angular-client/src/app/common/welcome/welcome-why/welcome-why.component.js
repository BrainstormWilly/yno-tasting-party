import {template} from './welcome-why.es6';

export const WelcomeWhyComponent = {
  template,
  controller: class WelcomeWhyController{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
    }
  }
}
