export const template = `

<div class="welcome-background">

  <div class="welcome-hero-cover"></div>

  <div class="welcome-logo">
    <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary  welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-secondary>
  </div>

  <div class="welcome-copy full">
    <h2>Come on in. The wine is fine.</h2>
    <p>Every new Yno Host receives a free suggested tasting list. This list contains 18 wines in 3 price ranges that are readily available in most states and will kickstart your blind tasting adventure.</p>
    <form role="form" class="main-form" name="user_signup"
      ng-if="!$ctrl.taster"
      ng-submit="$ctrl.signupUser()">
      <div class="main-form-control" ng-class="{'error':user_signup.email.$dirty && user_signup.email.$invalid}">

        <input type="email" name="email" id="email"
          ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/"
          ng-model="$ctrl.user.email" required>
        <label for="email">Email</label>
      </div>
      <div class="main-form-control" ng-class="{'error':user_signup.password.$dirty && user_signup.password.$invalid}">

        <input type="password" name="password" id="password" required
          placeholder="6 character minimum"
          ng-model="$ctrl.user.password"
          ng-minlength="6">
        <label>Password</label>
      </div>
      <div class="main-form-control" ng-class="{'error':user_signup.password_confirmation.$dirty && user_signup.password_confirmation.$invalid}">

        <input type="password" name="password_confirmation" id="password_confirmation" required
          ng-model="$ctrl.user.password_confirmation"
          ng-minlength="6">
        <label>
          <span>Password</span>
          <span>Confirmation</span>
        </label>
      </div>
      <div class="main-form-btns">
        <span class="descriptor">Sign Up</span>
        <div>
          <button type='button' ui-sref="welcome-signin"><i class="fas fa-sign-in-alt"></i></button>
          <button type="submit" ng-disabled="$ctrl.signupInvalid(user_signup)">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </form>
    <form class="main-form" name="taster_signup"
      ng-if="$ctrl.taster"
      ng-submit="$ctrl.signupTaster()">
      <div class="main-form-control">
        <input type="text" name="name" id="name"
          placeholder="e.g. Jane Doe"
          ng-model="$ctrl.taster.name" required>
        <label class="main-form-control-label">Name</label>
      </div>
      <div class="main-form-control">
        <input type="text" name="name" id="name"
          placeholder="e.g. Wine Diva"
          ng-model="$ctrl.taster.handle" required>
        <label>Handle</label>
      </div>
      <div class="main-form-btns">
        <span class="descriptor">&nbsp;</span>
        <button type="submit"
          class="primary"
          ng-disabled="taster_signup.$invalid">
          <i class="fa fa-user"></i>
        </button>

      </div>
    </form>
    <div class="mobile-nav-spacer"></div>
  </div>
  <div class="mobile-nav-spacer"></div>
</div>

<mobile-nav></mobile-nav>
<alerts-modal></alerts-modal>

`;
