export class MailerService {
  constructor ($log, $http, $rootScope, constants, AlertsService) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.constants = constants;
    this.AlertsService = AlertsService;
  }

  sendContactUs(message){
    this.$http.post(this.constants.apiUrl + "/admin/contact_us", {message: message})
      .then(result => {
        this.AlertsService.setConfirmationAlert(result.data.message);
      })
  }

  newSignUp(taster_id){
    this.$http.put(this.constants.apiUrl + "/admin/new_sign_up/" + taster_id)
  }

  newTasting(tasting_id){
    this.$http.put(this.constants.apiUrl + "/admin/new_tasting/" + tasting_id)
  }

}
