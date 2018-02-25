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
      <div class="main-form-control" ng-class="{'error':signinForm.email.$dirty && signinForm.email.$invalid}">
        <label>Email</label>
        <input type="email" name="email" required
          ng-model="$ctrl.user.email"
          ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/">
      </div>
      <div class="main-form-control" ng-class="{'error':signinForm.password.$dirty && signinForm.password.$invalid}">
        <label>Password</label>
        <input type="password" name="password" required
          ng-model="$ctrl.user.password"
          ng-minlength="6">
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="button" ng-click="$ctrl.setViewState(2)"><i class="fa fa-key"></i></button>
          <button type="submit"
            ng-disabled="signinForm.$invalid">
            <i class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </form>

    <form name="pwdResetForm" ng-submit="$ctrl.requestPasswordReset()" ng-if="$ctrl.viewState==2">
      <div class="main-form-control" ng-class="{'error':pwdResetForm.email.$dirty && pwdResetForm.email.$invalid}">
        <label>Email</label>
        <input name="email" type="email" required
          ng-model="$ctrl.user.email"
          ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/">
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="button" ng-click="$ctrl.setViewState()"><i class="fa fa-sign-in"></i></button>
          <button type="submit"
            ng-disabled="pwdResetForm.$invalid">
            <i class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </form>

    <form name="updatePasswordForm" ng-submit="$ctrl.resetUserPassword()" ng-if="$ctrl.viewState==3">
      <div class="main-form-control" ng-class="{'error':updatePasswordForm.token.$dirty && updatePasswordForm.token.$invalid}">
        <label>Code</label>
        <input ng-model="$ctrl.user.reset_password_token" type="text" name="token" required>
      </div>
      <div class="main-form-control" ng-class="{'error':updatePasswordForm.password.$dirty && updatePasswordForm.password.$invalid}">
        <label>Password</label>
        <input type="password" name="password" placeholder="6 characters minimum" required
          ng-minlength="6"
          ng-model="$ctrl.user.password"
          ng-class="{'error':updatePasswordForm.password.$dirty && updatePasswordForm.password.$invalid}">
      </div>
      <div class="main-form-control" ng-class="{'error':updatePasswordForm.passwordConfirmation.$dirty && updatePasswordForm.passwordConfirmation.$invalid}">
        <label><span>Password</span><span>Confirmation</span></label>
        <input type="password" name="passwordConfirmation" required
          ng-model="$ctrl.user.password_confirmation"
          ng-minlength="6">
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="button" ng-click="$ctrl.setViewState()"><i class="fa fa-sign-in"></i></button>
          <button type="submit"
            ng-disabled="updatePasswordForm.$invalid || $ctrl.user.password!=$ctrl.user.password_confirmation">
            <i class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </form>
  </div>

  <alerts-modal></alerts-modal>
  <wait-state wait-on="$ctrl.wait"></wait-state>
`;
