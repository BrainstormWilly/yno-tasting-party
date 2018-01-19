export class WineReviewService {
  constructor ($rootScope, $log, $http, $q, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;

  }

  getStatus(review_id){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/wine_reviews/" + review_id + "/status")
      .then(result=>{
        defer.resolve(result.data);
      })
      .catch(err=>{
        this.$log.error("WineReviewService.getStatus", err);
      });
    return defer.promise;
  }

  index(){
    let defer = this.$q.defer();
    this.$http.get(this.constants.apiUrl + "/wine_reviews")
      .then(result=>{
        defer.resolve(result.data)
      })
      .catch(err=>{
        this.$log.error("WineReviewService.index", err);
      });
    return defer.promise;
  }

  updateReview(review){
    this.$http.put(this.constants.apiUrl + "/wine_reviews/" + review.id, review)
      .then(result=>{
        this.$rootScope.$broadcast("wine-review-update-event", result.data)
      })
      .catch(err=>{
        this.$log.error("WineReviewService.updateReview", err);
      })
  }

  // setCurrentReview(review){
  //   this.current_review = review;
  //   this.$rootScope.$broadcast('current-wine-review-change-event', review);
  // }
  // getCurrentReview(){
  //   return this.current_review;
  // }

}
