export class TasterInitialData {

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

  getTaster(){
    let defer = this.$q.defer();
    this.UserService.getValidateUser()
      .then(user=>{
        // this.$log.log(user);
        this.TasterService.getTasterFromUser(user.id)
          .then(result=>{
            // this.$log.log(result.data);
            defer.resolve( result.data);
          })
          .catch(err=>{
            this.$log.error(err);
            this.$state.go("welcome");
          });
      }).catch(err=>{
        this.$log.error(err);
        this.$state.go("welcome");
      });
    // this.$log.log(defer.promise);
    return defer.promise
  }

}
