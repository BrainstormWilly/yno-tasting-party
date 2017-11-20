export class UserService {
  constructor ($rootScope, $log, $http, $q, $auth, constants) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.constants = constants;
    this.user = null;
    this.state = "user_unset";
    // this.$log.log(this.$auth);

  }


  inviteUser(user){
    return this.$http.post(this.constants.apiUrl + "/users/invite/", {user:user});
  }

  getUserByEmail(email){
    return this.$http.post(this.constants.apiUrl + "/users/email/", {email:email});
  }

  getValidateUser(){
    return this.$auth.validateUser();
  }

  validationState(){
    return this.state;
  }

  // deprecate this in favor of getValidateUser
  validateUser(){
    this.state = "validating";
    this.$auth.validateUser()
      .then(user => {
        this.setUser(user);
      })
      .catch(() => {
        this.state = "unvalidated";
        this.user = null;
      })
  }

  signinUser(user){
    return this.$auth.submitLogin(user);
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
