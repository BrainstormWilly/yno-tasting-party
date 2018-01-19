export const template = `
<div class="main-modal-wrapper">
  <div class="main-modal-container">
    <div class="main-modal-content">
      <connection-list-item
        ng-repeat="connection in $ctrl.connections"
        connection="connection"
        taster="$ctrl.host.taster"
        select-action="$ctrl.selectConnection(conn)">
      </connection-list-item>
    </div>
  </div>
</div>
`;
