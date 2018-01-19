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
      <host-location-form></host-location-form>
    </div>
  </div>
`
