export const template = `

<div class="main-wrapper">
  <img id="header-logo" src='assets/images/yno_tasting_logo_white.svg'>

  <a class="info-btn" ui-sref="welcome-signin"><i class="fa fa-glass"></i></a>
  <a class="welcome-signin-btn welcome-primary-btn" ui-sref="welcome-signin">Sign In</a>
  <a class="welcome-signup-btn" href  ng-click="$ctrl.toggleReviewMode()">Sign Up</a>
  <a class="info-btn" href><i class="fa fa-unlock-alt"></i></a>
</div>



`
