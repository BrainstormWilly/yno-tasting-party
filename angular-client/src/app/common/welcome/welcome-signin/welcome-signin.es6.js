export const template = `

  <a class="welcome-logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <div class="welcome-container">
    <h3 ng-if="$ctrl.viewState==1">Come on in. The wine is fine.</h3>
    <h3 ng-if="$ctrl.viewState==2">Lost your password?</h3>
    <p ng-if="$ctrl.viewState==2">We'll email you a code to reset it.</p>
    <h3 ng-if="$ctrl.viewState==3">Email on the way!</h3>
    <p ng-if="$ctrl.viewState==3">Paste in the code provided in your email, enter in your new password, and get back in the game.</p>

    <form name="signinForm" ng-submit="$ctrl.signinUser()" ng-if="$ctrl.viewState==1">
      <div class="main-form-control">
        <label>Email</label>
        <input ng-model="$ctrl.user.email" type="email" required>
      </div>
      <div class="main-form-control">
        <label>Password</label>
        <input ng-model="$ctrl.user.password" ng-minlength="6" type="password" required>
      </div>
      <div class="main-form-btns">
        <button ng-click="$ctrl.viewState=2"><i class="fa fa-key"></i></button>
        <button type="submit"
          ng-disabled="signinForm.$invalid">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>

    <form name="pwdResetForm" ng-submit="$ctrl.requestPasswordReset()" ng-if="$ctrl.viewState==2">
      <div class="main-form-control">
        <label>Email</label>
        <input name="email" ng-model="$ctrl.user.email" type="email" required>
      </div>
      <div class="main-form-btns">
        <button ng-click="$ctrl.viewState=1"><i class="fa fa-sign-in"></i></button>
        <button type="submit"
          ng-disabled="pwdResetForm.$invalid">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>

    <form name="updatePasswordForm" ng-submit="$ctrl.resetUserPassword()" ng-if="$ctrl.viewState==3">
      <div class="main-form-control">
        <label>Code</label>
        <input ng-model="$ctrl.user.reset_password_token" type="text" required>
      </div>
      <div class="main-form-control">
        <label>Password</label>
        <input ng-model="$ctrl.user.password" type="password" ng-minlength="6" required>
      </div>
      <div class="main-form-control">
        <label><span>Password</span><span>Confirmation</span></label>
        <input ng-model="$ctrl.user.password_confirmation" type="password" ng-minlength="6" required>
      </div>
      <div class="main-form-btns">
        <button ng-click="$ctrl.viewState=1"><i class="fa fa-sign-in"></i></button>
        <button type="submit"
          ng-disabled="updatePasswordForm.$invalid || $ctrl.user.password!=$ctrl.user.password_confirmation">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>
  </div>

  <alerts-modal></alerts-modal>
  <wait-state wait-on="$ctrl.wait"></wait-state>
`;
