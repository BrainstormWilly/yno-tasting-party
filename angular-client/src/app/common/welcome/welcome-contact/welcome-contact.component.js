import {template} from './welcome-contact.es6';

export const WelcomeContactComponent = {
  template,
  controller: class WelcomeContactController{
    constructor($log, $state, welcomeConstants, MailerService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.constants = welcomeConstants;
      this.MailerService = MailerService;
      this.message = {};
    }

    // $onInit(){
    //   this.TasterService.getTasterFromValidation(false)
    //     .then(data=>{
    //       message.taster_id = data.;
    //     })
    // }

    sendContactInfo(){
      // this.$log.log(this.message);
      this.MailerService.sendContactUs(this.message);
    }
  }
}
