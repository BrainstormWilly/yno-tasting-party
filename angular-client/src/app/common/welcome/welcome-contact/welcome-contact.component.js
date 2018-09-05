import {template} from './welcome-contact.es6';

export const WelcomeContactComponent = {
  template,
  controller: class WelcomeContactController{
    constructor($log, $state, welcomeConstants, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
      this.TasterService = TasterService;
      this.taster = null;
      this.message = {};
    }

    $onInit(){
      let promise = this.TasterService.getTasterFromValidation(false);
      promise.then(data=>{
        this.taster = data;
      })
    }

    sendContactInfo(){
      // this.$log.log(this.message);
      let taster_id = this.taster ? this.taster.id : 0;
      this.TasterService.sendContactUs(this.message, taster_id);
    }
  }
}
