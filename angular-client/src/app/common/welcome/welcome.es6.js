export const template = `<img id="header-logo" src='assets/images/yno_tasting_logo_white.svg'>

<h2>Welcome to Yno!</h2>

<div>
  <a class="main-btn main-primary-btn" ui-sref="welcome-signin">Sign In</a>
  <a class="main-btn main-secondary-btn" href ng-click="$ctrl.changeWelcomeState('welcome.signup')">Sign Up</a>
</div>`
