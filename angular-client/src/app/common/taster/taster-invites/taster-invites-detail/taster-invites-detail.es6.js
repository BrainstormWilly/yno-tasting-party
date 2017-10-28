export const template = `
<div class="main-header">
  <h2>Invitation Confirmation</h2>
  <div>
    <button><span class="fa fa-thumbs-down"></span></button>
    <button ng-click="$ctrl.approveInvite()"><span class="fa fa-thumbs-up"></span></button>
  </div>
</div>
<div class='main-content'>
  <div class='taster-invites-detail-wrapper'>
    <tasting-detail tasting="$ctrl.tasting"></tasting-detail>
  </div>
</div>
<nav></nav>
`
