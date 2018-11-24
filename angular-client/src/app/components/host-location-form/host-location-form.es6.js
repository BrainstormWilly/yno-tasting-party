export const template =`

<form name="newLocationForm">
  <div class="main-form-container">
    <div class="main-form-control" ng-class="{'error' : newLocationForm.phone.$dirty && newLocationForm.phone.$invalid}">
      <input name="phone" type="tel" required
        placeholder="555-123-4567"
        ng-pattern="/[0-9]{3}-?[0-9]{3}-?[0-9]{4}/"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-model="$ctrl.host_location.location.phone">
          <label><span>Phone</span></label>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.address.$dirty && newLocationForm.address.$invalid}">
      <input name="address" type="text"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-model="$ctrl.host_location.location.address" required>
          <label><span>Address</span></label>
    </div>
    <div class="main-form-control">
      <input name="address2" type="text" placeholder="Optional"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-model="$ctrl.host_location.location.address2" >
          <label><span>Address2</span></label>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.city.$dirty && newLocationForm.city.$invalid}">
      <input name="locationCity" type="text"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-model="$ctrl.host_location.location.city" required>
          <label><span>City</span></label>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.state.$dirty && newLocationForm.state.$invalid}">
      <input name="locationState" type="text" required
        ng-focus="$ctrl.openStateSelector()"
        ng-model="$ctrl.host_location.location.state"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-readonly="true">
          <label><span>State</span></label>
    </div>
    <div class="main-form-control" ng-class="{'error' : newLocationForm.postal.$dirty && newLocationForm.postal.$invalid}">
      <input name="postal" type="text"
        ng-change="$ctrl.checkAction({host_location:$ctrl.host_location})"
        ng-model="$ctrl.host_location.location.postal" required>
          <label><span>Postal</span></label>
    </div>
    <div class="main-form-control checkbox" ng-click="$ctrl.host_location.primary=!$ctrl.host_location.primary">

      <label><span class="fa" ng-class="{'fa-square-o':!$ctrl.host_location.primary, 'fa-check-square':$ctrl.host_location.primary}"></span></label>
      <div>Primary Location</div>
    </div>
  </div>
  <!-- <div class="main-form-btns">
    <button ng-click="$ctrl.backAction()"><span class="fa fa-arrow-left"></span></button>
    <div>
      <button type="reset"><span class="fa fa-refresh"></span></button>
      <button type="submit" ><span class="fa fa-check"></span></button>
    </div>
  </div> -->
</form>

<state-selector-modal></state-selector-modal>
`
