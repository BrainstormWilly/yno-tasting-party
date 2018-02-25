export const template = `

  <a class="welcome-logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <div class="welcome-container">
    <p>Setup up your account and we'll get you on to your tastings!</p>
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
        <span>&nbsp;</span>
        <button type="submit"
          ng-disabled="acceptInviteForm.$invalid || $ctrl.taster.user.password!=$ctrl.taster.user.password_confirmation">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </form>
  </div>

`;
