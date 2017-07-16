export const template = `
  <div class="wine-review-wrapper">
    <h2>Rate Wine {{$ctrl.review.wine_number}}</h2>
    <div class="wine-review-form-wrapper">

      <a class="wine-review-ratings-wrapper"
        ng-if="!notes_mode"
        ng-class="$ctrl.getRatingStyle(rating.rating)"
        ng-click="$ctrl.review.rating = rating.rating"
        ng-repeat="rating in $ctrl.ratings">
          <div class="name" >{{rating.label}}</div>
          <div class="btn" ng-class="$ctrl.getRatingStyle(rating.rating)">
            <span>{{rating.rating}}</span>
          </div>
      </a>
      <div class="wine-review-notes-wrapper" ng-show="notes_mode">
        <textarea placeholder="Tasting Notes (optional)" ng-model="$ctrl.review.comments"></textarea>
        <button class="fa fa-times-circle" ng-click="$ctrl.review.comments=''"></button>
      </div>
    </div>
    <div class="wine-review-btns-wrapper">
      <button
        class="wine-review-notes-btn"
        ng-class="{primary: notes_mode}"
        ng-click="notes_mode=!notes_mode">
          <i class="fa" ng-class="{'fa-comment-o': !$ctrl.review.comments, 'fa-comments-o': $ctrl.review.comments.length>0}"></i>
      </button>
      <button
        class="wine-review-submit-btn"
        ng-class="{primary: !notes_mode}"
        ng-click="$ctrl.updateReview()">
          <i class="fa fa-check"></i>
      </button>
    </div>
  </div>


`;
