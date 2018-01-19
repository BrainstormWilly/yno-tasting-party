export const template = `

  <a class="logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <h3 ng-if="$ctrl.viewState==1">Join us. It's wine tasting while blind...what could go wrong?</h3>
  <h3 ng-if="$ctrl.viewState==2">Welcome. Now tell other tasters a bit about yourself.</h3>

  <div class="main-form-wrapper user"
    ng-if="$ctrl.viewState==1">
      <form role="form" class="main-form" ng-submit="$ctrl.signupUser()" name="user_signup">
        <input class="main-form-control"
          ng-model="$ctrl.user.email"
          ng-class="{error: user_signup.email.$invalid && user_signup.email.$dirty}"
          type="email" name="email" id="email"
          placeholder="Email"
          required>
        <input class="main-form-control"
          ng-model="$ctrl.user.password"
          ng-minlength="6"
          ng-class="{error: user_signup.password.$invalid && user_signup.password.$dirty}"
          type="password" name="password" id="password"
          placeholder="Password"
          required>
        <input class="main-form-control"
          ng-model="$ctrl.user.password_confirmation"
          ng-minlength="6"
          ng-class="{error: (user_signup.password_confirmation.$invalid || $ctrl.user.password!=$ctrl.user.password_confirmation) && user_signup.password_confirmation.$dirty}"
          type="password" name="password_confirmation" id="password_confirmation"
          placeholder="Password Confirm"
          required>
        <button type="submit" class="main-form-control" ng-disabled="$ctrl.signupInvalid(user_signup)">
          <i class="fa fa-user-plus"></i>
        </button>
      </form>
  </div>

  <div class="main-form-wrapper taster" ng-if="$ctrl.viewState==2">
    <form class="main-form" name="taster_signup" ng-submit="$ctrl.signupTaster()">
      <input class="main-form-control"
        ng-model="$ctrl.taster.name"
        type="text"
        placeholder="Name (e.g. Jane Doe)">
      <input class="main-form-control"
        ng-model="$ctrl.taster.handle"
        type="text"
        placeholder="Tasting Handle (e.g. Wine Diva)">
      <button href type="submit" class="main-form-control">
        <i class="fa fa-user"></i>
      </button>
    </form>
  </div>

`;
