export class UserService {
  constructor ($rootScope, $log, $http, $auth, $state) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.user = false;
  }

  validateUser(){
    this.$auth.validateUser()
      .then(user => {
        this.setUser(user);
      })
      .catch(() => {
        this.user = null;
        this.$state.go('welcome');
      })
  }

  signinUser(user){
    this.$auth.submitLogin(user)
      .then(user => {
        this.setUser(user);
      })
      .catch(() => {
        this.setUser(false);
      })
  }

  signoutUser(){
    this.$auth.signOut()
      .then(() => {
        this.user = null;
        this.$state.go('welcome');
      })
      .catch(error => {
        this.$log.log("signout failed", error);
      })
  }

  setUser(user){
    this.user = user;
    this.$rootScope.$broadcast('user-change-event', user);
  }
  getUser(){
    return this.user;
  }

}
