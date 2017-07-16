export const template = `
<div class="main-wrapper">
  <a ui-sref="welcome">
    <img id="header-logo" src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <div class="main-form-wrapper">
    <form class="main-form" ng-submit="$ctrl.signinUser()">
      <input class="main-form-control" ng-model="$ctrl.user.email" type="email" placeholder="Email">
      <input class="main-form-control" ng-model="$ctrl.user.password" type="password" placeholder="Password">
      <button href type="submit" class="main-form-control">
        <i class="fa fa-sign-in"></i>
      </button>

    </form>
  </div>
</div>
`;
