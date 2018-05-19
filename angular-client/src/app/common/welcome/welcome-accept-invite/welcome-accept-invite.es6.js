export const template = `

<div class="welcome-background">

  <div class="welcome-hero">
    <img src='assets/images/welcome/welcome-landing-hero.png'>
  </div>

  <div class="welcome-hero-cover"></div>

  <div class="welcome-logo">
    <a ui-sref='welcome'><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary></desktop-nav-secondary>
  </div>

  <div class="welcome-copy full">
    <h2>Come on in. The wine is fine.</h2>
    <p>Set up up your account so we can get you on to your tasting!</p>
    <form name="acceptInviteForm" ng-submit="$ctrl.acceptInvite()">
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.name.$dirty && acceptInviteForm.name.$invalid}">
        <label>Name</label>
        <input type="text" name="name" placeholder="Jane Doe" required
          ng-model="$ctrl.taster.name">
      </div>
      <div class="main-form-control">
        <label><span>Handle</span><span>(Optional)</span></label>
        <input ng-model="$ctrl.taster.handle" type="text" placeholder="Wine Diva">
      </div>
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.password.$dirty && acceptInviteForm.password.$invalid}">
        <label>Password</label>
        <input name="password" type="password" placeholder="6 characters minimum" required
          ng-model="$ctrl.taster.user.password"
          ng-minlength="6">
      </div>
      <div class="main-form-control" ng-class="{'error':acceptInviteForm.passwordConfirmation.$dirty && acceptInviteForm.passwordConfirmation.$invalid}">
        <label><span>Password</span><span>Confirmation</span></label>
        <input type="password" name="passwordConfirmation" required
          ng-model="$ctrl.taster.user.password_confirmation"
          ng-minlength="6">
      </div>
      <div class="main-form-btns">
        <span class='descriptor'>Accept Invite</span>
        <button type="submit"
          ng-disabled="acceptInviteForm.$invalid || $ctrl.taster.user.password!=$ctrl.taster.user.password_confirmation">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>
  </div>

  <desktop-nav-primary welcome-state="$ctrl.constants.WELCOME_SIGNIN_STATE"></desktop-nav-primary>

</div>
<mobile-nav></mobile-nav>
<wait-state></wait-state>
<alerts-modal></alerts-modal>

`;
