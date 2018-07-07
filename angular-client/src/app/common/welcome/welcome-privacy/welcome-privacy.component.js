import {template} from './welcome-privacy.es6';


export const WelcomePrivacyComponent = {
  bindings:{
    taster: "<"
  },
  template,
  controller: class WelcomePrivacyController{
    constructor($state, welcomeConstants){
      'ngInject';
      this.$state = $state;
      this.constants = welcomeConstants;
    }

  }
}
