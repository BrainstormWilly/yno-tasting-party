export const template = `
<div class="dashboard">
  <div class="dashboard-logo">
    <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary signout-state="true"></desktop-nav-secondary>
  </div>
  <taster-panel taster='$ctrl.taster'></taster-panel>
  <div class="dashboard-reviews-wrapper">
    <div class="dashboard-reviews-header">
      <h2>Wine List</h2>
      <p>You’ve tasted {{$ctrl.reviews.length}} wines!</p>
      <sort-bar
        fields="$ctrl.sortFields"
        select-action="$ctrl.changeSorting(field)">
      </sort-bar>
    </div>
    <div class="dashboard-reviews">
      <wine-list-item
        ng-repeat="review in $ctrl.reviews | orderBy:$ctrl.sortField:$ctrl.sortDesc"
        wine-view="wines"
        wine-item="review"
        select-action="$ctrl.openWineModal(review)">
      </wine-list-item>
      <div class="mobile-nav-spacer"></div>
    </div>
  </div>
</div>

<mobile-nav signed-in="true"></mobile-nav>
<wine-info-modal></wine-info-modal>
`
