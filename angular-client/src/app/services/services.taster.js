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
    this.reviews = [];
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
    this.$http.get(this.constants.apiUrl + "/tasters/" + taster + "/invites")
      .then(invites => {
        this.setInvites(invites.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  setInvites(invites){
    this.invites = invites;
    this.$rootScope.$broadcast('taster-invites-change-event', invites);
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
