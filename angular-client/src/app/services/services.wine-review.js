export class WineReviewService {
  constructor ($rootScope, $log, $http, constants) {
    'ngInject';

    this.constants = constants;
    this.$log = $log;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.current_review = null;

  }

  updateReview(review){
    this.$http.put(this.constants.apiUrl + "/wine_reviews/" + review.id, review)
      .then(result => {
        this.setCurrentReview(result.data);
      })
      .catch(error => {
        this.$log.error(error);
      });
  }

  setCurrentReview(review){
    this.current_review = review;
    this.$rootScope.$broadcast('current-wine-review-change-event', review);
  }
  getCurrentReview(){
    return this.current_review;
  }

}
