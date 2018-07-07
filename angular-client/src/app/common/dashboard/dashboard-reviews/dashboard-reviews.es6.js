export const template = `

<div class="dashboard">
  <div class="desktop-logo">
    <div class="desktop-logo-top"></div>
    <div class="desktop-logo-bottom">
      <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary signout-state="true"></desktop-nav-secondary>
    </div>
  </div>
  <taster-panel taster='$ctrl.taster'></taster-panel>
  <div class="dashboard-panel">
    <div class="dashboard-section">
      <div class="dashboard-section-header">
        <h3>Wine List</h3>
        <sort-bar
          fields="$ctrl.sortFields"
          select-action="$ctrl.changeSorting(field)">
        </sort-bar>
      </div>
      <div class="dashboard-section-list">
        <p>You’ve tasted {{$ctrl.reviews.length}} wines!</p>
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
</div>

<mobile-nav signed-in="true" is-host="$ctrl.taster.is_host"></mobile-nav>
<wine-info-modal></wine-info-modal>
`
