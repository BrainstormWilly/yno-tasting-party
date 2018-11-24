export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3 ng-show="$ctrl.tasting.is_open">Review Wine {{$ctrl.pending_review.wine_number}}</h3>
        <h3 ng-hide="$ctrl.tasting.is_open">Your Review for Wine {{$ctrl.pending_review.wine_number}}</h3>
      </div>
      <div class="wine-review-form">
        <div class="ratings" ng-if="$ctrl.tasting.is_open">
          <button class="text-btn {{rating.cls}}"
            ng-repeat="rating in $ctrl.ratings"
            ng-click="$ctrl.pending_review.rating = rating.number"
            ng-class="{'selected':$ctrl.pending_review.rating==rating.number}">
              <span>{{rating.number}}</span>
          </button>
        </div>
        <div class="main-form-control" ng-if="$ctrl.tasting.is_open">

          <textarea ng-model="$ctrl.pending_review.comments"></textarea>
          <label>Comments</label>
        </div>
        <div class="closed" ng-if="!$ctrl.tasting.is_open">
          <div class="closed-rating" ng-hide="$ctrl.tasting.is_open">
            {{$ctrl.pending_review.rating}}
          </div>
          <div>
            {{$ctrl.pending_review.comments}}
            <span ng-hide="$ctrl.pending_review.comments">No Comments</span>
          </div>
        </div>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.updateReview()" ng-show="$ctrl.tasting.is_open"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>
  </div>
`
