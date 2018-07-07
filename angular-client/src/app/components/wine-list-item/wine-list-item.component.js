import {template} from './wine-list-item.es6';

export const WineListItemComponent = {
  bindings: {
    wineItem: "<",
    deleteAction: "&",
    selectAction: "&",
    editable: "<",
    wineView: "@"
  },
  template,
  controller: class WineListItemController{
    constructor($log, $element, $scope){
      'ngInject';
      this.$log = $log;
      this.$element = $element;
      this.$progress = $element.find(".wine-list-item-progress");
      this.$ratingInteger = $element.find(".wine-list-item-rating-integer");
      this.rating = 1;

      // $log.log("WineListItemComponent.constructor");

      let wineReviewUpdateEvent = $scope.$on('wine-review-update-event', (e,d) => {
        // $log.log("WineListItemComponent", d);
        if(this.wineItem.wine_number==d.wine_number){
          this.wineItem.rating = d.rating;
          this.wineItem.comments = d.comments;
          this.wineItem.unrated = false;
          TweenMax.to(this.$progress, 1, {width: (100*this.wineItem.rating/5)+"%"});
          TweenMax.to(this, 1, {rating:this.wineItem.rating, onUpdate:this.onUpdateRating.bind(this)})
        }
      });

      $scope.$on("destroy", wineReviewUpdateEvent);
    }

    $onInit() {
      // this.$log.log("WineListItem",this.wineItem)
      if( this.wineView=="averageRating" ){
        TweenMax.to(this.$progress, 1, {width: (100*this.wineItem.average_rating/5)+"%"});
        TweenMax.to(this, 1, {rating:this.wineItem.average_rating, onUpdate:this.onUpdateRating.bind(this)});
      }else if( this.wineView=="tasterRating" ){
        TweenMax.to(this.$progress, 1, {width: (100*this.wineItem.rating/5)+"%"});
        TweenMax.to(this, 1, {rating:this.wineItem.rating, onUpdate:this.onUpdateRating.bind(this)});
      }
    }

    onUpdateRating(){
      let num;
      if( this.wineView=="averageRating" ){
        num = Math.round(this.rating*10)/10;
        if( Math.round(num)==num ){
          num = num + ".0";
        }
      }else{
        num = Math.round(this.rating);
      }
      this.$ratingInteger.text(num);
      // this.$log.log(this.rating);
    }
  }
}
