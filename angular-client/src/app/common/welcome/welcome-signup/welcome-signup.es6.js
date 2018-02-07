export const template = `

  <a class="welcome-logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <div class="welcome-container">
    <h3 ng-if="$ctrl.viewState==1">Join us.</h3>
    <p ng-if="$ctrl.viewState==1">It's tasting wine while blind...what could go wrong?</p>
    <h3 ng-if="$ctrl.viewState==2">Welcome.</h3>
    <p ng-if="$ctrl.viewState==2">Now tell other tasters a bit about yourself.</p>

    <form role="form" class="main-form" name="user_signup"
      ng-submit="$ctrl.signupUser()"
      ng-if="$ctrl.viewState==1">
      <div class="main-form-control">
        <label>Email</label>
        <input type="email" name="email" id="email"
          ng-model="$ctrl.user.email" required>
      </div>
      <div class="main-form-control">
        <label>Password</label>
        <input type="password" name="password" id="password"
          ng-model="$ctrl.user.password"
          ng-minlength="6" required>
      </div>
      <div class="main-form-control">
        <label>
          <span>Password</span>
          <span>Confirmation</span>
        </label>
        <input type="password" name="password_confirmation" id="password_confirmation"
          ng-model="$ctrl.user.password_confirmation"
          ng-minlength="6" required>
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <button type="submit" ng-disabled="$ctrl.signupInvalid(user_signup)">
          <i class="fa fa-user-plus"></i>
        </button>
      </div>
    </form>

    <form class="main-form" name="taster_signup"
      ng-if="$ctrl.viewState==2"
      ng-submit="$ctrl.signupTaster()">
      <div class="main-form-control">
        <label>Name</label>
        <input type="text" name="name" id="name"
          placeholder="e.g. Jane Doe"
          ng-model="$ctrl.taster.name" required>
      </div>
      <div class="main-form-control">
        <label>Handle</label>
        <input type="text" name="name" id="name"
          placeholder="e.g. Wine Diva"
          ng-model="$ctrl.taster.handle" required>
      </div>
      <div class="main-form-btns">
        <span>&nbsp;</span>
        <button type="submit" ng-disabled="taster_signup.$invalid">
          <i class="fa fa-user"></i>
        </button>
      </div>
    </form>
  </div>

  <alerts-modal></alerts-modal>

`;
