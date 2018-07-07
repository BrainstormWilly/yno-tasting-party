export const template = `

  <a class="connection-list-item-link" href ng-click="$ctrl.selectAction()">
    <div class="connection-list-item-tab">
      <span>Connected</span>
      <span>{{ $ctrl.connection.connected_at | utcToLocalDate:"MMM-YYYY" }}</span>
    </div>
    <div class="connection-list-item-title">{{ $ctrl.connection.taster_name }}</div>
  </a>



`
