export const template = `

  <div class="dashboard">
    <div class="dashboard-logo">
      <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary signout-state="true"></desktop-nav-secondary>
    </div>
    <taster-panel taster='$ctrl.taster'></taster-panel>
    <div class="dashboard-tastings">
      <h2>Tasting List</h2>
      <p>{{$ctrl.message}}</p>
      <tasting-list-item
        ng-repeat="tasting in $ctrl.tastings | orderBy:'-open_at'"
        ng-class="{'pending':tasting.status=='Pending', 'open':tasting.status=='Open'}"
        tasting="tasting"
        select-action="$ctrl.selectTasting(tasting)">
      </tasting-list-item>
    </div>

  </div>

  <mobile-nav signed-in="true"></mobile-nav>
`
