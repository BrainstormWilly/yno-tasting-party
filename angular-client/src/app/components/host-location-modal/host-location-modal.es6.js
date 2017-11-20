export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">
      <div class="main-modal-header">
        <h3>Hosting Locations</h3>
      </div>
      <div class="main-modal-content" ng-show="$ctrl.state==1">
        <ul>
          <li ng-repeat="host_loc in $ctrl.hostLocations">
            <a href ng-click="$ctrl.selected_host_location = host_loc" ng-class="{'selected' : $ctrl.selected_host_location.id==host_loc.id}">
              <span class="badge fa fa-asterisk" ng-show="host_loc.primary"></span>
              <span>{{host_loc.location.to_short_string}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="main-modal-footer" ng-show="$ctrl.state==1">
        <button ng-click="$ctrl.state=2"><span class="fa fa-plus"></span></button>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.confirmModal()"><span class="fa fa-check"></span></button>
        </div>
      </div>
      <form name="newLocationForm">
        <div class="new-host-form"
          ng-show="$ctrl.state==2">
            <div class="main-form-container">
              <div class="main-form-control" ng-class="{'error' : newLocationForm.phone.$touched && newLocationForm.phone.$invalid}">
                <label><span>Phone</span></label>
                <input name="phone" type="tel"
                  placeholder="555-123-4567"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  ng-model="$ctrl.new_location.phone">
              </div>
              <div class="main-form-control" ng-class="{'error' : newLocationForm.address.$touched && newLocationForm.address.$invalid}">
                <label><span>Address</span></label>
                <input name="address" type="text" ng-model="$ctrl.new_location.address" required>
              </div>
              <div class="main-form-control">
                <label><span>Address2</span></label>
                <input name="address2" type="text" ng-model="$ctrl.new_location.address2" >
              </div>
              <div class="main-form-control" ng-class="{'error' : newLocationForm.city.$touched && newLocationForm.city.$invalid}">
                <label><span>City</span></label>
                <input name="locationCity" type="text" ng-model="$ctrl.new_location.city" required>
              </div>
              <div class="main-form-control" ng-class="{'error' : newLocationForm.state.$touched && newLocationForm.state.$invalid}">
                <label><span>State</span></label>
                <input name="locationState" type="text" required
                ng-focus="$ctrl.openStateSelector()"
                ng-model="$ctrl.new_location.state"
                ng-readonly="true">
              </div>
              <div class="main-form-control" ng-class="{'error' : newLocationForm.postal.$touched && newLocationForm.postal.$invalid}">
                <label><span>Postal</span></label>
                <input name="postal" type="text" ng-model="$ctrl.new_location.postal" required>
              </div>
            </div>
        </div>
        <div class="main-modal-footer" ng-show="$ctrl.state==2">
          <button ng-click="$ctrl.state=1"><span class="fa fa-arrow-left"></span></button>
          <div>
            <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
            <button ng-click="$ctrl.addLocation()"><span class="fa fa-check"></span></button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <state-selector-modal></state-selector-modal>
`
