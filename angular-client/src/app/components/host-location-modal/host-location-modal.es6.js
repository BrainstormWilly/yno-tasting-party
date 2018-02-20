export const template = `
  <div class="main-modal-wrapper">
    <div class="main-modal-container">

      <div class="main-modal-header">
        <h3>Hosting Locations</h3>
      </div>

      <div class="main-modal-content">
        <ul ng-show="$ctrl.viewState==1">
          <li ng-repeat="host_loc in $ctrl.hostLocations">
            <a href ng-click="$ctrl.selectedLocation = host_loc.location" ng-class="{'selected' : $ctrl.selectedLocation.id==host_loc.location.id}">
              <span class="badge fa fa-asterisk" ng-show="host_loc.primary"></span>
              <span>{{host_loc.location.to_short_string}}</span>
            </a>
          </li>
        </ul>
        <host-location-form
          check-action="$ctrl.onNewHostLocationChange(host_location)"
          ng-show="$ctrl.viewState==2">
        </host-location-form>
      </div>

      <div class="main-modal-footer">
        <span>&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.viewState=2" ng-if="$ctrl.viewState==1"><span class="fa fa-plus"></span></button>
          <button ng-click="$ctrl.viewState=1" ng-if="$ctrl.viewState==2"><span class="fa fa-arrow-left"></span></button>
          <button ng-click="$ctrl.confirmModal()" ng-if="$ctrl.viewState==1"><span class="fa fa-check"></span></button>
          <button
            ng-click="$ctrl.confirmModal()"
            ng-if="$ctrl.viewState==2"
            ng-disabled="$ctrl.newHostLocationInvalid">
              <span class="fa fa-check"></span>
          </button>
        </div>
      </div>

    </div>
  </div>
`
