export const template = `
<header>
  <h2>Hosting</h2>
</header>
<section>
  <div>
    Becoming a tasting host is easy. Simple add one or more tasting locations and you can begin inviting friends.
  </div>
  <form name="newLocationForm" ng-submit="$ctrl.addHostLocation()">
  <div class="main-form-container">
    <div class="main-form-control" ng-class="{'error' : newLocationForm.phone.$touched && newLocationForm.phone.$invalid}">
      <label><span>Phone</span></label>
      <input name="phone" type="tel"
        placeholder="555-123-4567"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        ng-model="$ctrl.newLocation.phone">
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.address.$touched && newLocationForm.address.$invalid}">
      <label><span>Address</span></label>
      <input name="address" type="text" ng-model="$ctrl.newLocation.address" required>
    </div>
    <div class="main-form-control">
      <label><span>Address2</span></label>
      <input name="address2" type="text" ng-model="$ctrl.newLocation.address2" >
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.city.$touched && newLocationForm.city.$invalid}">
      <label><span>City</span></label>
      <input name="locationCity" type="text" ng-model="$ctrl.newLocation.city" required>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.state.$touched && newLocationForm.state.$invalid}">
      <label><span>State</span></label>
      <input name="locationState" type="text" required
      ng-focus="$ctrl.openStateSelector()"
      ng-model="$ctrl.newLocation.state"
      ng-readonly="true">
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.postal.$touched && newLocationForm.postal.$invalid}">
      <label><span>Postal</span></label>
      <input name="postal" type="text" ng-model="$ctrl.newLocation.postal" required>
    </div>
    <div class="main-form-btns">
      <span>&nbsp;</span>
      <button type="submit" ng-disabled="newLocationForm.$invalid">
        <span class="fa fa-check"></span>
      </button>
    </div>
  </div>
  </form>
</section>

<footer-menu></footer-menu>
<state-selector-modal></state-selector-modal>
`
