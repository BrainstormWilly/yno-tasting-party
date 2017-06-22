export const template = `<a ui-sref="welcome">
  <img id="header-logo" src='assets/images/yno_tasting_logo_white.svg'>
</a>

<form ng-submit="$ctrl.signinUser()">
  <input ng-model="$ctrl.user.email" type="email" placeholder="Email">
  <input ng-model="$ctrl.user.password" type="password" placeholder="Password">
  <input type="submit">
</form>`
