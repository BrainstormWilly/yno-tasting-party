export const template = `

  <a class="logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <h3>Come on in. The wine is fine.</h3>

  <form name="signinForm">
    <div class="main-form-control">
      <label>Email</label>
      <input ng-model="$ctrl.user.email" type="email" required>
    </div>
    <div class="main-form-control">
      <label>Password</label>
      <input ng-model="$ctrl.user.password" type="password" required>
    </div>
  </form>

  <button
    ng-disabled="signinForm.$invalid"
    ng-click="$ctrl.signinUser()">
    <i class="fa fa-sign-in"></i>
  </button>


`;
