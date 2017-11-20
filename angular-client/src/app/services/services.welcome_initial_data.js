export class WelcomeInitialData {

  constructor ($log, $q, $state,
    TasterService,
    UserService
    )
  {

    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$state = $state;
    this.TasterService = TasterService;
    this.UserService = UserService;
  }

  getSignin(){
    let defer = this.$q.defer();
    this.UserService.getValidateUser()
      .then(user=>{
        this.TasterService.getTasterFromUser(user.id)
          .then(()=>{
            this.$state.go('taster-dashboard');
          })
          .catch(()=>{
            defer.resolve({});
          });
      }).catch(()=>{
        defer.resolve({});
      });
    return defer.promise
  }

}
