export class UserService {
  constructor ($rootScope, $log, $http, $auth) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.user = false;
  }

  validateUser(){
    this.$auth.validateUser()
      .then(user => {
        this.setUser(user);
      })
      .catch(reason => {
        this.setUser(false);
        this.$log.warn("No User", reason);
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

  setUser(user){
    this.user = user;
    this.$rootScope.$broadcast('user-change-event', user);
  }
  getUser(){
    return this.user;
  }

}
