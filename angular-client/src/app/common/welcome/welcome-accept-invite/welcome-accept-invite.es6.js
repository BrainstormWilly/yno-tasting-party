export const template = `

<div class="welcome-background">

  <div class="welcome-hero-cover"></div>

  <div class="welcome-logo">
    <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-secondary>
  </div>

  <div class="welcome-copy full">
    <h2>Come on in. The wine is fine.</h2>
    <p>Set up up your account so we can get you on to your tasting!</p>
    <form name="acceptInviteForm" ng-submit="$ctrl.acceptInvite()">
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.name.$dirty && acceptInviteForm.name.$invalid}">

        <input type="text" name="name" placeholder="Jane Doe" required
          ng-model="$ctrl.taster.name">
        <label>Name</label>
      </div>
      <div class="main-form-control">

        <input ng-model="$ctrl.taster.handle" type="text" placeholder="Wine Diva">
        <label><span>Handle</span><span>(Optional)</span></label>
      </div>
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.password.$dirty && acceptInviteForm.password.$invalid}">

        <input name="password" type="password" placeholder="6 characters minimum" required
          ng-model="$ctrl.taster.user.password"
          ng-minlength="6">
        <label>Password</label>
      </div>
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.passwordConfirmation.$dirty && acceptInviteForm.passwordConfirmation.$invalid}">

        <input type="password" name="passwordConfirmation" required
          ng-model="$ctrl.taster.user.password_confirmation"
          ng-minlength="6">
        <label><span>Password</span><span>Confirmation</span></label>
      </div>
      <div class="main-form-btns">
        <span class='descriptor'>Accept Invite</span>
        <button type="submit"
          class="primary"
          ng-disabled="acceptInviteForm.$invalid || $ctrl.taster.user.password!=$ctrl.taster.user.password_confirmation">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>
    <div class="mobile-nav-spacer"></div>
  </div>

</div>
<mobile-nav></mobile-nav>
<wait-state></wait-state>
<alerts-modal></alerts-modal>

`;
