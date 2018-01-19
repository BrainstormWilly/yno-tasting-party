import {template} from './welcome.es6';

export const WelcomeComponent = {
  bindings:{
    user: "<"
  },
  template,
  controller: class WelcomeComponent{
    constructor($log, $state){
      'ngInject';
      this.$log = $log;
      this.$state = $state;

    }

    $onInit() {
      if( this.user ){
        this.$state.go("dashboard");
      }

    }


  }
}
