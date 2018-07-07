export const template = `

<div class="dashboard">
<div class="desktop-logo">
  <div class="desktop-logo-top"></div>
  <div class="desktop-logo-bottom">
    <a ui-sref="dashboard"><img src='assets/images/yno_tasting_logo_white.svg'></a>
    <desktop-nav-secondary signout-state="true"></desktop-nav-secondary>
  </div>
</div>
  <taster-panel taster='$ctrl.taster'></taster-panel>
  <div class="dashboard-panel">
    <div class="dashboard-section">
      <div class="dashboard-section-header">
        <h3>Tasting Invitations</h3>
      </div>
      <div class="dashboard-section-list">
        <p ng-hide="$ctrl.invitations.length==0">Select tasting to confirm/deny invitation</p>
        <p ng-show="$ctrl.invitations.length==0">Sad news.<br>You currently have no tasting invitations.</p>
        <tasting-list-item
          ng-repeat="invitation in $ctrl.invitations | orderBy: open_at"
          tasting="invitation.tasting"
          select-action="$ctrl.selectInvitation(invitation)">
        </tasting-list-item>
        <div class="mobile-nav-spacer"></div>
      </div>
    </div>
  </div>
</div>

<mobile-nav signed-in="true" is-host="$ctrl.taster.is_host"></mobile-nav>
<invitation-detail-modal></invitation-detail-modal>

`
