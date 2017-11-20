export class TastingNewService {

  constructor ($log, $q, $state,
    GuestService,
    TasterService,
    TastingService,
    TastingWineService,
    UserService
    )
  {

    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$state = $state;
    this.GuestService = GuestService;
    this.TasterService = TasterService;
    this.TastingService = TastingService;
    this.TastingWineService = TastingWineService;
    this.UserService = UserService;
  }

  createTasting(tasting){
    return this.TastingService.createTasting(tasting);
  }

  inviteGuest(tasting, user){
    let defer = this.$q.defer();
    let answer = {};
    let taster = {};
    let guest = {tasting_id:tasting.id};
    if( user.id ){
      // invite existing taster
    }else{
      this.UserService.inviteUser(user)
        .then(result=>{
          user = result.data;
          taster.user_id = user.id;
          this.TasterService.createTaster(taster)
            .then(result=>{
              taster = result.data;
              guest.taster_id = taster.id;
              this.GuestService.inviteNewUser(guest)
                .then(result=>{
                  answer.success = true;
                  answer.guest = result.data;
                  defer.resolve(answer);
                })
                .catch(err=>{
                  answer.success = false;
                  answer.message = "GuestService Error: " + err.statusText;
                  defer.resolve(answer);
                })
            })
            .catch(err=>{
              answer.success = false;
              answer.message = "TasterService Error: " + err.statusText;
              defer.resolve(answer);
            });
        })
        .catch(err=>{
          answer.success = false;
          answer.message = "UserService Error: " + err.statusText;
          defer.resolve(answer);
        });
    }
    return defer.promise;
  }

}
