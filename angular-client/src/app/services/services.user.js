export class UserService {
  constructor ($rootScope, $log, $http, $auth) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.user = null;
    this.state = "user_unset";

    // let success = $rootScope.$on("auth.registration-email-success", function(e){
    //   this.$log.log("email success");
    // });
    //
    // let failure = $rootScope.$on("auth.registration-email-error", function(e){
    //   this.$log.log("email failure");
    // });
    //
    // $rootScope.$on('$destroy', success);
    // $rootScope.$on('$destroy', failure);
  }

  validationState(){
    return this.state;
  }

  validateUser(){
    this.state = "validating";
    this.$auth.validateUser()
      .then(user => {
        this.setUser(user);
      })
      .catch(error => {
        this.state = "unvalidated";
        this.user = null;
      })
  }

  signinUser(user){
    this.$auth.submitLogin(user)
      .then(user => {
        this.setUser(user);
      })
      .catch(() => {
        this.setUser(null);
      })
  }

  signoutUser(){
    this.state = "user_unset";
    this.$auth.signOut()
      .finally(()=>{
        this.setUser(null);
      })
  }

  signupUser(user){
    this.state = "validating";
    this.$auth.submitRegistration(user)
      .then(response => {
        if( response.data.status=="success" ){
          this.setUser(response.data.data)
        }else{
          this.state = "unvalidated";
          this.user = null;
          this.$log.error(response.data.data);
        }
      })
      .catch(error => {
        this.$log.error(error);
      })
  }

  setUser(user){
    this.state = "user_set";
    this.user = user;
    this.$rootScope.$broadcast('user-change-event', user);
  }
  getUser(){
    return this.user;
  }

}
