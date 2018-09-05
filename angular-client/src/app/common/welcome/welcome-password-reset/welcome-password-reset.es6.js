export const template = `

<div class="welcome-background">

  <div class="welcome-hero">
    <img src='assets/images/welcome/welcome-landing-hero.png'>
  </div>

  <div class="welcome-hero-cover"></div>

  <div class="welcome-logo">
    <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-secondary>
  </div>

  <div class="welcome-copy full">
    <h2>{{$ctrl.subtitle}}</h2>
    <p>{{$ctrl.copy}}</p>
    <form name="pwdResetForm" ng-submit="$ctrl.requestPasswordReset()" ng-if="$ctrl.viewState==1">
      <div class="main-form-control" ng-class="{'error':pwdResetForm.email.$dirty && pwdResetForm.email.$invalid}">
        <label>Email</label>
        <input name="email" type="email" required
          ng-model="$ctrl.user.email"
          ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/">
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <div>
          <button type="button" ui-sref="welcome-signin"><i class="fa fa-sign-in"></i></button>
          <button type="submit"
            ng-disabled="pwdResetForm.$invalid">
            <i class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </form>
    <form name="updatePasswordForm" ng-submit="$ctrl.resetUserPassword()" ng-if="$ctrl.viewState==2">
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
    <div class="mobile-nav-spacer"></div>
  </div>

  <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-primary>

</div>

<mobile-nav></mobile-nav>
<alerts-modal></alerts-modal>
<wait-state wait-on="$ctrl.wait"></wait-state>

`;
