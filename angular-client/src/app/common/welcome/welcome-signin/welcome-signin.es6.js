export const template = `

<div class="welcome-background">

  <div class="welcome-hero-cover"></div>

  <div class="welcome-logo">
    <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-secondary>
  </div>

  <div class="welcome-copy full">
    <h2>{{$ctrl.subtitle}}</h2>
    <p>{{$ctrl.copy}}</p>
    <form name="signinForm" ng-submit="$ctrl.signinUser()">
      <div class="main-form-control" ng-class="{'error':signinForm.email.$dirty && signinForm.email.$invalid}">
        <input type="email" name="email" required
          ng-model="$ctrl.user.email"
          ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
        <label>Email</label>
      </div>
      <div class="main-form-control" ng-class="{'error':signinForm.password.$dirty && signinForm.password.$invalid}">
        <input type="password" name="password" required
          ng-model="$ctrl.user.password"
          ng-minlength="6">
        <label>Password</label>
      </div>
      <div class="main-form-btns">
        <span class='descriptor'>Sign In</span>
        <div>
          <button type="button" ui-sref='welcome-signup'><i class="fas fa-user-plus"></i></button>
          <button type="button" ui-sref='welcome-password-reset'><i class="fas fa-key"></i></button>
          <button type="submit"
            class="primary"
            ng-disabled="signinForm.$invalid">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </form>
    <div class="mobile-nav-spacer"></div>
  </div>

</div>

<mobile-nav></mobile-nav>
<alerts-modal></alerts-modal>
<wait-state wait-on="$ctrl.wait"></wait-state>

`;
