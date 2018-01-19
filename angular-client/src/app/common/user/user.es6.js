export const template = `
<header>
  <h2>User Profile</h2>
</header>

<section>
  <div class="user-profile-header" ng-if="$ctrl.user.host && $ctrl.user.taster.status=='active'">
    <toggle-switch
      toggle-trigger="$ctrl.toggleHostState()"
      toggle-state="$ctrl.hostState"
      toggle-label="$ctrl.hostStateLabel">
    </toggle-switch>
  </div>

  <div ng-hide="$ctrl.hostState">
    <h3>Taster Info</h3>
    <p class="notes" ng-if="$ctrl.user.taster.status=='inactive'">
      Your taster account is currently inactive. All of your connections are invisible. You will no longer be invited to tastings. Please contact us if you would like to be permanently deleted from Yno Tasting.
    </p>
    <button class="text-btn good"
      ng-if="!$ctrl.user.host && $ctrl.user.taster.status=='active'"
      ui-sref="user-host">
        Host Your Own Tastings!
    </button>
    <form name="userForm">
    <div class="main-form-container">
      <div class="main-form-control" ng-if="$ctrl.user.taster.status=='active'">
        <label for="email">Email</label>
        <input type="email" ng-model="$ctrl.user.email" name="email" required>
      </div>
      <div class="main-form-control" ng-if="$ctrl.user.taster.status=='active'">
        <label for="password">Password</label>
        <input type="password" ng-model="$ctrl.user.password" name="email" ng-minlength="6">
      </div>
      <div class="main-form-control" ng-if="$ctrl.user.taster.status=='active'">
        <label for="password"><span>Password</span><span>Confirmation</span></label>
        <input type="password" ng-model="$ctrl.user.password_confirmation" name="email" ng-minlength="6">
      </div>
      <div class="main-form-control" ng-if="$ctrl.user.taster.status=='active'">
        <label for="name">Name</label>
        <input type="text" ng-model="$ctrl.user.taster.name" name="name" required>
      </div>
      <div class="main-form-control" ng-if="$ctrl.user.taster.status=='active'">
        <label for="handle">Handle</label>
        <input type="text" ng-model="$ctrl.user.taster.handle" name="handle" placeholder="Optional">
      </div>
      <div class="main-form-btns">
        <span style="padding-left:1rem;">{{$ctrl.user.taster.status}}</span>
        <div>
          <button ng-click="$ctrl.attemptDeactivateTaster()" ng-if="$ctrl.user.taster.status=='active'">
            <span class="fa fa-user-times"></span>
          </button>
          <button ng-click="$ctrl.activateTaster()" ng-if="$ctrl.user.taster.status=='inactive'">
            <span class="fa fa-user-plus"></span>
          </button>
          <button
            ng-click="$ctrl.updateUser()"
            ng-if="$ctrl.user.taster.status=='active'"
            ng-disabled="userForm.$invalid || ($ctrl.user.password && $ctrl.user.password!==$ctrl.user.password_confirmation)">
              <span class="fa fa-check"></span>
          </button>
        </div>
      </div>
    </div>
    </form>
  </div>
  <div ng-show="$ctrl.hostState">
    <h3>Current Locations</h3>
    <div class="user-host-locations" ng-repeat="hl in $ctrl.user.host.locations">
      <div class="primary"><span class="fa fa-asterisk" ng-if="hl.primary"></span></div>
      <div class="location">{{hl.location.to_short_string}}</div>
      <div class="buttons">
        <button class="small-btn secondary"
          ng-click="$ctrl.changePrimaryHostLocation(hl)"
          ng-disabled="hl.primary || $ctrl.user.host.locations.length==1">
            <span class="fa fa-asterisk"></span>
        </button>
        <button class="small-btn"
          ng-click="$ctrl.destroyHostLocation(hl)"
          ng-disabled="$ctrl.user.host.locations.length==1">
            <span class="fa fa-minus"></span>
        </button>
      </div>
    </div>
    <h3>Add New Location</h3>
    <host-location-form></host-location-form>
  </div>
</section>

<footer-menu></footer-menu>

<alerts-modal></alerts-modal>
`
