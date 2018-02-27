export class GuestService {
  constructor ($log, $http, $q, $state, $rootScope, constants) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.constants = constants;
  }


  getInvitations(){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/guests/invitations")
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("GuestService","getInvitations", err);
        this.$state.to("dashboard");
      });
    return defer.promise;
  }

  confirmInvitation(tasting_id){
    return this.$http.get(this.constants.apiUrl + "/guests/confirm/" + tasting_id);
  }

  denyInvitation(tasting_id){
    return this.$http.get(this.constants.apiUrl + "/guests/deny/" + tasting_id);
  }

  create(guest){
    return this.$http.post(this.constants.apiUrl + "/guests", {guest: guest});
  }

  inviteNewUser(tasting_id, user_email){
    this.$http.post(this.constants.apiUrl + "/guests/invite_new_user", {tasting_id:tasting_id, email:user_email})
      .then(result=>{
        this.$rootScope.$broadcast("invite-taster-event", result.data);
      })
      .catch(err=>{
        this.$log.error("GuestService.inviteNewUser", err);
      })
  }

  inviteTaster(tasting_id, taster_id){
    this.$http.post(this.constants.apiUrl + "/guests/invite_taster", {tasting_id:tasting_id, taster_id:taster_id})
      .then(result=>{
        this.$rootScope.$broadcast("invite-taster-event", result.data);
      })
      .catch(err=>{
        this.$log.error("GuestService.inviteTaster", err);
      })
  }

  destroy(guest_id){
    this.$http.delete(this.constants.apiUrl + "/guests/" + guest_id)
      .then(result=>{
        this.$rootScope.$broadcast("destroy-guest-event", result.data);
      })
      .catch(err=>{
        this.$log.error("GuestService.destroy", err);
      });
  }

  includeHost(tasting_id){
    this.$http.get(this.constants.apiUrl + "/guests/include_host/" + tasting_id)
      .then(()=>{
        // this.$rootScope.$broadcast("include-host-as-guest-event", result.data);
        this.$state.reload();
      })
      .catch(err=>{
        this.$log.error("GuestService.includeHost", err);
      });
  }

  // removeHost(tasting_id){
  //   this.$http.get(this.constants.apiUrl + "/guests/remove_host/" + tasting_id)
  //     .then(result=>{
  //       this.$rootScope.$broadcast("remove-host-as-guest-event", result.data);
  //     })
  //     .catch(err=>{
  //       this.$log.error("GuestService.removeHost", err);
  //     });
  // }

  show(guest_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/guests/" + guest_id)
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("GuestService.show", err);
      });
    return defer.promise;
  }

}
