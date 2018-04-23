import {template} from './welcome.es6';

export const WelcomeComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeComponent{
    constructor($log, $state, welcomeConstants){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
      // this.navOn = false;
      this.welcomeState = this.constants.WELCOME_LANDING_STATE;
      this.heroImg = this.constants.WELCOME_LANDING_HERO;
      this.tagline = this.constants.WELCOME_LANDING_TAGLINE;
    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }
    }

    setWelcomeState(state){
      switch (state) {
        case this.constants.WELCOME_WHO_STATE:
          this.heroImg = this.constants.WELCOME_WHO_HERO;
          this.tagline = this.constants.WELCOME_WHO_TAGLINE;
          break;
        case this.constants.WELCOME_WHY_STATE:
          this.heroImg = this.constants.WELCOME_WHY_HERO;
          this.tagline = this.constants.WELCOME_WHY_TAGLINE;
          break;
        case this.constants.WELCOME_HOW_STATE:
          this.heroImg = this.constants.WELCOME_HOW_HERO;
          this.tagline = this.constants.WELCOME_HOW_TAGLINE;
          break;
        default:
          state = this.constants.WELCOME_LANDING_STATE;
          this.heroImg = this.constants.WELCOME_LANDING_HERO;
          this.tagline = this.constants.WELCOME_LANDING_TAGLINE;

      }
      this.welcomeState = state;
    }


  }
}
