export const template = `
  <div class="main-modal-wrapper">

    <div class="main-modal-container" ng-if="$ctrl.viewState==1">
      <div class="main-modal-header">
        <h3>Add Guests</h3>
      </div>
      <div class="main-modal-subheader">
        <toggle-switch
          ng-if="$ctrl.tasting.host.connections.length>0"
          toggle-trigger="$ctrl.toggleAddGuestMethod()"
          toggle-label="$ctrl.addGuestStatus.label"
          toggle-state="$ctrl.addGuestStatus.state">
        </toggle-switch>
        <button class="text-btn include-host"
          ng-disabled="$ctrl.hostTastingStatus.state"
          ng-click="$ctrl.addHostToGuests()">
            {{$ctrl.hostTastingStatus.label}}
        </button>
      </div>
      <form name="inviteForm">
      <div class="main-modal-content">
        <div class="add-guest-form" ng-if="!$ctrl.addGuestStatus.state">
          <div class="main-form-control">
            <input type="email" ng-model="$ctrl.user.email" required>
              <label>Email</label>
          </div>
        </div>
        <connection-list-item
          ng-if="$ctrl.addGuestStatus.state"
          ng-repeat="connection in $ctrl.connections"
          connection="connection"
          taster="$ctrl.tasting.host.taster"
          select-action="$ctrl.inviteConnection(connection)">
        </connection-list-item>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button type="button" ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button
            type="submit"
            ng-disabled="inviteForm.$invalid"
            ng-click="$ctrl.searchUserByEmail($ctrl.user.email)"
            ng-if="!$ctrl.addGuestStatus.state">
              <span class="fa fa-check"></span>
          </button>
        </div>
      </div>
      </form>
    </div>

    <div class="main-modal-container" ng-if="$ctrl.viewState==2">
      <div class="main-modal-header">
        <h3>Confirm Guest</h3>
      </div>
      <div class="main-modal-content">
        <div class="add-guest-form">
          <h4>{{$ctrl.result.title}}</h4>
          <p>{{$ctrl.result.body}}</p>
        </div>
      </div>
      <div class="main-modal-footer">
        <span class="descriptor">&nbsp;</span>
        <div>
          <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
          <button ng-click="$ctrl.inviteNewUser()"><span class="fa fa-check"></span></button>
        </div>
      </div>
    </div>

  </div>
`
