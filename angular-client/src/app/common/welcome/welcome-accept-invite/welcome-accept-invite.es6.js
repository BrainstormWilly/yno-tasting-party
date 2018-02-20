export const template = `

  <a class="welcome-logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>

  <div class="welcome-container">
    <p>Setup up your account and we'll get you on to your tastings!</p>
    <form name="acceptInviteForm" ng-submit="$ctrl.acceptInvite()">
      <div class="main-form-control">
        <label>Name</label>
        <input ng-model="$ctrl.taster.name" type="text" placeholder="Jane Doe" required>
      </div>
      <div class="main-form-control">
        <label><span>Handle</span><span>(Optional)</span></label>
        <input ng-model="$ctrl.taster.handle" type="text" placeholder="Wine Diva">
      </div>
      <div class="main-form-control">
        <label>Password</label>
        <input ng-model="$ctrl.taster.user.password" type="password" required>
      </div>
      <div class="main-form-control">
        <label><span>Password</span><span>Confirmation</span></label>
        <input ng-model="$ctrl.taster.user.password_confirmation" type="password" required>
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
