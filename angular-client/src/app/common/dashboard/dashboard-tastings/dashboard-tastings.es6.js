export const template = `

  <div class="desktop-nav">
    <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary></desktop-nav-secondary>
  </div>
  <div class="dashboard">
    <taster-panel taster='$ctrl.taster'></taster-panel>
    <div class="dashboard-panel">
      <div class="dashboard-section">
        <div class="dashboard-section-header">
          <h3>Tasting List</h3>
          <button class="small-btn" ui-sref="tasting-new" ng-if="$ctrl.taster.is_host"><span class="fas fa-plus"></span></button>
        </div>
        <div class="dashboard-section-list">
          <p>{{$ctrl.message}}</p>
          <tasting-list-item
            ng-repeat="tasting in $ctrl.tastings | orderBy:'-open_at'"
            tasting="tasting"
            select-action="$ctrl.selectTasting(tasting)">
          </tasting-list-item>
          <div class="mobile-nav-spacer"></div>
        </div>
      </div>
    </div>
  </div>

  <mobile-nav signed-in="true" is-host="$ctrl.taster.is_host"></mobile-nav>

`
