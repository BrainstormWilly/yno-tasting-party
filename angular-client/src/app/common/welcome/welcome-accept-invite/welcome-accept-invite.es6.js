export const template = `

  <a class="logo-header" ui-sref="welcome">
    <img src='assets/images/yno_tasting_logo_white.svg'>
  </a>


  <p>Setup up your account and we'll get you on to your tastings!</p>
  <form name="acceptInviteForm">
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
    <button type="submit"
      ng-disabled="acceptInviteForm.$invalid"
      ng-click="$ctrl.acceptInvite()">
      <i class="fa fa-check"></i>
    </button>
  </form>

`;
