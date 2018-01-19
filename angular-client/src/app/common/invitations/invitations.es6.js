export const template = `
  <header>
    <h2>Invites for {{$ctrl.taster.name}}</h2>
  </header>
  <section>
    <p ng-hide="$ctrl.invitations.length==0">Select tasting to confirm/deny invitation</p>
    <p ng-show="$ctrl.invitations.length==0">Sad news.<br>You currently have no tasting invitations.</p>
    <tasting-list-item
      ng-repeat="invitation in $ctrl.invitations | orderBy: open_at"
      tasting="invitation.tasting"
      select-action="$ctrl.selectInvitation(invitation)">
    </tasting-list-item>
  </section>
  <footer-menu></footer-menu>
  <invitation-detail-modal></invitation-detail-modal>
`
