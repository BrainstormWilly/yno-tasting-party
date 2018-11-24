export const template = `
<div class="main-modal-wrapper">
  <div class="main-modal-container">
    <div class="main-modal-header">
      <h3>{{$ctrl.invitation.tasting.name}}</h3>
    </div>
    <div class="main-modal-content">
      <div class="body">
        <p>Hosted by: {{$ctrl.invitation.tasting.host.taster.name}}<br>
        {{$ctrl.invitation.tasting.location.phone}}<br>
        {{$ctrl.invitation.tasting.location.address}}<br>
        <span ng-show="$ctrl.invitation.tasting.location.address2">{{$ctrl.invitation.tasting.location.address2}}<br></span>
        {{$ctrl.invitation.tasting.location.city}}, {{$ctrl.invitation.tasting.location.state}} {{$ctrl.invitation.tasting.location.postal}}
        </p>
        <p>{{$ctrl.invitation.tasting.open_at | utcToLocalDate:"lll"}}</p>
        <p ng-show="$ctrl.invitation.tasting.description">{{$ctrl.invitation.tasting.description}}</p>
      </div>
    </div>
    <div class="main-modal-footer">
      <span class="descriptor">&nbsp;</span>
      <div>
        <button ng-click="$ctrl.closeModal()"><span class="fa fa-times"></span></button>
        <button ng-click="$ctrl.denyInvitation()"><span class="fa fa-thumbs-down"></span></button>
        <button ng-click="$ctrl.confirmInvitation()"><span class="fa fa-thumbs-up"></span></button>
      </div>
    </div>
  </div>
</div>
`
