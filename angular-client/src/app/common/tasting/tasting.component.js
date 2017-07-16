import {template} from './tasting.es6';

export const TastingComponent = {
  bindings: {
    $transition$: "<"
  },
  template,
  controller: class TastingComponent{
    constructor($scope, $log, $state, TastingService, TasterService){
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.TasterService = TasterService;
      this.TastingService = TastingService;


      let tastingChangeEvent = $scope.$on('tasting-change-event', (e,d) => {
        let wr, i = 0;
        this.tasting = d;
        this.tasting_wines = this.tasting.tasting_wines;
        this.wine_reviews = this.tasting.wine_reviews;
        this.tasting_progress = this.tasting.tasting_progress;
        this.tasting_progress_percent = Math.round(this.tasting_progress * 100) + "%";
        this.average_ratings = Array(this.tasting_wines.length).fill(0);
        this.taster_reviews = [];
        angular.forEach(this.tasting.guests, function(v){
          if( v.taster_id == this.taster.id ){
            this.taster_progress = v.tasting_progress;
            this.taster_progress_percent = Math.round(this.taster_progress * 100) + "%";
            return;
          }
        }, this);
        for(i=0; i<this.wine_reviews.length; i++){
          wr = this.wine_reviews[i];
          this.average_ratings[wr.wine_number-1] += wr.rating;
          if( wr.taster_id==this.taster.id ){
            this.taster_reviews[wr.wine_number-1] = wr;
          }
        }
        for(i=0; i<this.average_ratings.length; i++){
          wr = this.average_ratings[i];
          this.average_ratings[i] = wr / this.tasting_wines.length;
        }
        // this.$log.log(this.taster_reviews);
      });

      let tasterChangeEvent = $scope.$on('taster-change-event', (e,d) => {
        this.taster = d;
        TastingService.loadTasting(this.$transition$.params("to").id);
      });

      let userChangeEvent = $scope.$on('user-change-event', (e,d) => {
        TasterService.loadTasterFromUser(d.id);
      });

      $scope.$on('$destroy', userChangeEvent);
      $scope.$on('$destroy', tasterChangeEvent);
      $scope.$on('$destroy', tastingChangeEvent);
    }

    $onInit() {
      this.tasting = null;
      this.tasting_progress = 0;
      this.tasting_progress_percent = "0%";
      this.taster_progress = 0;
      this.taster_progress_percent = "0%";
      this.tasting_wines = [];
      this.wine_reviews = [];
      this.average_ratings = [];
      this.taster_ratings = [];
      this.average_ratings = [];
      this.taster_ratings = [];
      this.taster = this.TasterService.getTaster();
      this.review_mode = false;
      if( this.taster ){
        this.TastingService.loadTasting(this.$transition$.params("to").id);
      }
    }

    reviewColor(review){
      let rating = this.getRealTasterRating(review);
      if(rating=="?"){
        return "unrated";
      }else if(rating >= 3.3){
        return "good";
      }else if(rating >= 1.7){
        return "ok";
      }
      return "bad";
    }

    toggleReviewMode(){
      this.review_mode = !this.review_mode;
      if( !this.review_mode ){
        this.TastingService.loadTasting(this.$transition$.params("to").id);
      }
    }

    getRealTasterRating(review){
      if(review.unrated) return "?";
      return review.rating;
    }


  }
}
