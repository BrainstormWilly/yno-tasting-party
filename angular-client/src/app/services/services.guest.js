export class GuestService {
  constructor ($log, $http, constants) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.constants = constants;
  }

  getGuestByEmail(email){
    return this.$http.post(this.constants.apiUrl + "/guests/email/", {email: email});
  }

  createGuest(guest){
    return this.$http.post(this.constants.apiUrl + "/guests", {guest: guest});
  }

  inviteGuest(tasting, user){
    if(user.id){
      // existing user service
    }else{
      return this.$http.post(this.constants.apiUrl + "/guests/invite_new_user", {tasting_id:tasting.id, email:user.email});
    }
  }

}
