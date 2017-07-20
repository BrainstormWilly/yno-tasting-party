export const template = `

  <a class="logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <h3>Come on in. The wine is fine.</h3>
  <div class="main-form-wrapper">
    <form class="main-form" ng-submit="$ctrl.signinUser()">
      <input class="main-form-control" ng-model="$ctrl.user.email" type="email" placeholder="Email">
      <input class="main-form-control" ng-model="$ctrl.user.password" type="password" placeholder="Password">
      <button href type="submit" class="main-form-control">
        <i class="fa fa-sign-in"></i>
      </button>

    </form>
  </div>

`;
