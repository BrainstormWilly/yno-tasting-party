export const template = `
  <div class="dashboard">
    <div class="dashboard-logo">
      <img src='assets/images/yno_tasting_logo_white.svg'>
      <desktop-nav-secondary signout-state="true"></desktop-nav-secondary>
    </div>
    <taster-panel taster='$ctrl.taster'></taster-panel>
    <!--<div class="dashboard-user">
      <a ui-sref='user'><span class="fas fa-user-circle"></span></a>
      <div>
        <h3>{{$ctrl.taster.name}}</h3>
        <h4 ng-if='$ctrl.taster.handle'>“{{$ctrl.taster.handle}}”</h4>
      </div>
    </div>-->
    <div class="dashboard-btns">
      <a class="dashboard-btn" ui-sref="invitations"
        ng-class="{disabled: $ctrl.taster.invite_count==0}">
        <img src='assets/images/glasses-with-wine.svg'>
        <span class="dashboard-btn-number">{{$ctrl.taster.invite_count}}</span>
        <span class="dashboard-btn-title">Invites</span>
      </a>

      <a class="dashboard-btn" ui-sref="dashboard-tastings"
        ng-class="{disabled: $ctrl.taster.tasting_count==0}">
        <img src='assets/images/glass-with-wine.svg'>
          <span class="dashboard-btn-number">{{$ctrl.taster.tasting_count}}</span>
          <span>Tastings</span>
      </a>
      <a class="dashboard-btn" ui-sref="dashboard-reviews"
        ng-class="{disabled: $ctrl.taster.review_count==0}">
          <img src='assets/images/wine-bottle-1.svg'>
          <span class="dashboard-btn-number">{{$ctrl.taster.review_count}}</span>
          <span>Wines</span>
      </a>
    </div>
  </div>

  <mobile-nav signed-in="true"></mobile-nav>
`
