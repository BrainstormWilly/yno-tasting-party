export const template = `

  <div class="tasting-header">
    <h2>{{$ctrl.tasting.name}}</h2>
    <p ng-if="$ctrl.tasting.description">{{$ctrl.tasting.description}}</p>
  </div>

  <div class="tasting-progress-wrapper">
    <div class="column">
      <div class="label">You</div>
      <div class="bar">
        <div class="progress" ng-style="{width: $ctrl.taster_progress_percent}"></div>
        <div class="progress-label">{{$ctrl.taster_progress_percent}} Complete</div>
      </div>
    </div>
    <div class="column">
      <div class="label">Tasting</div>
      <div class="bar">
        <div class="progress" ng-style="{width: $ctrl.tasting_progress_percent}"></div>
        <div class="progress-label">{{$ctrl.tasting_progress_percent}} Complete</div>
      </div>
    </div>
  </div>

  <div class="tasting-wines-wrapper">
    <div class="wine"
      ng-repeat="tw in $ctrl.tasting_wines"
      ng-click="$ctrl.selected_wine=$ctrl.taster_reviews[$index]; $ctrl.toggleReviewMode()">
        <div class="reviews-wrapper">
          <div class="review" ng-class="$ctrl.reviewColor($ctrl.taster_reviews[$index])">
            <span>{{$ctrl.getRealTasterRating($ctrl.taster_reviews[$index])}}</span>
          </div>
          <div class="review" ng-class="$ctrl.reviewColor($ctrl.average_ratings[$index])">
            <span>{{$ctrl.average_ratings[$index] | number:1}}</span>
          </div>
        </div>
        <div class="badge">
          <span>REVIEW</span>
          <span>WINE</span>
          <span class="wine-number">{{$index+1}}</span>
        </div>
    </div>
  </div>

  <nav></nav>

  <wine-review review="$ctrl.selected_wine" ng-show="$ctrl.review_mode" review-modal-trigger="$ctrl.toggleReviewMode()"></wine-review>


`
