export class UserService {
  constructor ($log, $http, $q, $auth, $state, $rootScope, constants, AlertsService) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$state = $state;
    this.constants = constants;
    this.AlertsService = AlertsService;
    // this.user = null;
    // this.state = "user_unset";
    // this.$log.log(this.$auth);

  }


  acceptInvite(user){
    let defer = this.$q.defer();
    this.$http.put(this.constants.apiUrl + "/users/invitation/accept/" + user.invitation_token, {user: user})
      .then(result=>{
        // this.$log.log("UserService", result);
        user.email = result.data.email;
        this.$auth.submitLogin(user)
          .then(()=>{
            defer.resolve(result.data);
          })
          .catch(err=>{
            this.$log.error("UserService.acceptInvite.login", err);
            this.$state.go("welcome");
          })
      })
      .catch(err=>{
        this.$log.error("UserService.acceptInvite", err);
        this.$state.go("welcome");
      })
    return defer.promise;
  }

  getUserByEmail(email){
    let defer = this.$q.defer();
    this.$http.post(this.constants.apiUrl + "/users/email/", {email:email})
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("UserService.getUserByEmail", err);
      });
    return defer.promise;
  }

  // do not redirect in case user is in welcome screen
  getUserByValidation(){
    let defer = this.$q.defer();
    this.$auth.validateUser()
      .then(user=>{
        if( user.errors ){
          defer.resolve(null);
        }else{
          defer.resolve(user);
        }
      })
      .catch(()=>{
        defer.resolve(null)
      });
    return defer.promise
  }

  getValidateUser(){
    return this.$auth.validateUser();
  }

  // validationState(){
  //   return this.state;
  // }

  // deprecate this in favor of getValidateUser
  // validateUser(){
  //   this.state = "validating";
  //   this.$auth.validateUser()
  //     .then(user => {
  //       this.setUser(user);
  //     })
  //     .catch(() => {
  //       this.state = "unvalidated";
  //       this.user = null;
  //     })
  // }

  requestPasswordReset(params){
    return this.$auth.requestPasswordReset(params);
  }

  signinUser(user){
    return this.$auth.submitLogin(user);
  }

  signoutUser(){
    // this.state = "user_unset";
    this.$auth.signOut()
      .then(()=>{
        this.$state.go("welcome");
      })
      .catch(err=>{
        this.$log.log("UserService.signoutUser", err);
      })
  }

  signupUser(user){
    let defer = this.$q.defer();
    this.$auth.submitRegistration(user)
      .then(response => {
        if( response.data.status=="success" ){
          defer.resolve({
            user_id: response.data.data.id,
            user: response.data.data
          });
        }else{
          // this.AlertsService.setFailureAlert(response.data.errors.full_messages[0]);
          this.$log.error("WelcomeSignupComponent.signupUser", response.data.data);
        }
      })
      .catch(error => {
        // this.$log.error("WelcomeSignupComponent.signupUser", error);
        this.AlertsService.setFailureAlert(error.data.errors.full_messages[0]);
      });
    return defer.promise;
  }

  show(user_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/users/" + user_id)
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("UserService.show", err);
      });
    return defer.promise;
  }

  update(user){
    this.$auth.updateAccount(user)
      .then(result=>{
        // this.$log.log("UserService.update", result);
        this.$rootScope.$broadcast("user-update-event", result.data.data);
      })
      .catch(err=>{
        this.$log.error("UserService.update", err);
      })
  }

  resetUserPassword(user){
    return this.$http.post(this.constants.apiUrl + "/users/password/reset", {user:user});
  }

}
