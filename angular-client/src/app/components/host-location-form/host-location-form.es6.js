export const template =`
<form name="newLocationForm" ng-submit="$ctrl.addLocation()">
  <div class="main-form-container">
    <div class="main-form-control" ng-class="{'error' : newLocationForm.phone.$touched && newLocationForm.phone.$invalid}">
      <label><span>Phone</span></label>
      <input name="phone" type="tel"
        placeholder="555-123-4567"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        ng-model="$ctrl.host_location.location.phone">
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.address.$touched && newLocationForm.address.$invalid}">
      <label><span>Address</span></label>
      <input name="address" type="text" ng-model="$ctrl.host_location.location.address" required>
    </div>
    <div class="main-form-control">
      <label><span>Address2</span></label>
      <input name="address2" type="text" ng-model="$ctrl.host_location.location.address2" >
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.city.$touched && newLocationForm.city.$invalid}">
      <label><span>City</span></label>
      <input name="locationCity" type="text" ng-model="$ctrl.host_location.location.city" required>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.state.$touched && newLocationForm.state.$invalid}">
      <label><span>State</span></label>
      <input name="locationState" type="text" required
      ng-focus="$ctrl.openStateSelector()"
      ng-model="$ctrl.host_location.location.state"
      ng-readonly="true">
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.postal.$touched && newLocationForm.postal.$invalid}">
      <label><span>Postal</span></label>
      <input name="postal" type="text" ng-model="$ctrl.host_location.location.postal" required>
    </div>
    <div class="main-form-control checkbox" ng-click="$ctrl.host_location.primary=!$ctrl.host_location.primary">
      <label><span class="fa" ng-class="{'fa-square-o':!$ctrl.host_location.primary, 'fa-check-square':$ctrl.host_location.primary}"></span></label>
      <div>Primary Location</div>
    </div>
  </div>
  <div class="main-form-btns">
    <span>&nbsp;</span>
    <div>
      <button type="reset"><span class="fa fa-refresh"></span></button>
      <button type="submit" ><span class="fa fa-check"></span></button>
    </div>
  </div>
</form>

<state-selector-modal></state-selector-modal>
`
