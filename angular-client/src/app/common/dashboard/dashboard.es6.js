export const template = `

    <!--<div class="desktop-hero-cover"></div>-->
    <div class="desktop-nav">
      <a href><img src='assets/images/yno_tasting_logo_white.svg'></a>
      <desktop-nav-secondary></desktop-nav-secondary>
    </div>
    <div class="dashboard">
      <taster-panel taster='$ctrl.taster'></taster-panel>
      <div class="dashboard-btns">
        <a class="dashboard-btn" ui-sref="dashboard-invitations"
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

  <mobile-nav></mobile-nav>
`
