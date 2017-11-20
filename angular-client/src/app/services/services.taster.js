export class TasterService {
  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.taster = null;
    this.tastings = [];
    this.invites = [];
    this.invite_tasting = null;
    this.reviews = [];
  }

  approveInvite(taster, tasting){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/approve_invite/" + tasting)
      .then(() => {
        // go to dashboard
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  createTaster(taster){
    return this.$http.post(this.constants.apiUrl + "/tasters", taster);
  }

  getTasterFromUser(user){
    return this.$http.get(this.constants.apiUrl + "/tasters/user/" + user)
  }

  loadTaster(taster){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster)
      .then(taster => {
        this.setTaster(taster.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  // deprecate in favor of getTasterFromUser()
  loadTasterFromUser(user){
    this.$http.get(this.constants.apiUrl + "/tasters/user/" + user)
      .then(taster => {
        this.setTaster(taster.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  loadTastings(taster){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/tastings")
      .then(tastings => {
        this.setTastings(tastings.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  loadReviews(taster){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/reviews")
      .then(reviews => {
        this.setReviews(reviews.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  loadInvites(taster){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/invite_tastings")
      .then(invites => {
        this.setInvites(invites.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  loadInviteTasting(taster, tasting){
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/invite_tasting/" + tasting)
      .then(tasting => {
        this.setInviteTasting(tasting.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  signupTaster(taster){
    this.$log.log(taster);
    this.$http.post(this.constants.apiUrl + "/tasters", taster)
      .then(response => {
        this.setTaster(response.data);
      })
      .catch(error => {
        this.$log.error(error);
      })
  }


  // GETTER-SETTERS

  setInvites(invites){
    this.invites = invites;
    this.$rootScope.$broadcast('taster-invites-change-event', invites);
  }
  getInvites(){
    return this.invites;
  }

  setInviteTasting(tasting){
    this.invite_tasting = tasting;
    this.$rootScope.$broadcast('taster-invite-tasting-change-event', tasting);
  }
  getInvites(){
    return this.invites;
  }

  setReviews(reviews){
    this.reviews = reviews;
    this.$rootScope.$broadcast('taster-reviews-change-event', reviews);
  }
  getReviews(){
    return this.reviews;
  }

  setTaster(taster){
    this.taster = taster;
    this.$rootScope.$broadcast('taster-change-event', taster);
  }
  getTaster(){
    return this.taster;
  }

  setTastings(tastings){
    this.tastings = tastings;
    this.$rootScope.$broadcast('taster-tastings-change-event', tastings);
  }
  getTastings(){
    return this.tastings;
  }

}
