export const template = `

  <a class="connection-list-item-link" href ng-click="$ctrl.selectAction()">
    <div class="connection-list-item-tab">
      <span>Connected</span>
      <span>{{ $ctrl.connection.connected_at | utcToLocalDate:"MMM-YYYY" }}</span>
    </div>
    <div class="connection-list-item-title"><span>{{ $ctrl.connection.taster_name }}</span></div>

  </a>

  <wait-state wait-on="$ctrl.connection.wait"></wait-state>


`
