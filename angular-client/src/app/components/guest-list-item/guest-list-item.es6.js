export const template = `
  <a class="guest-list-item-link" href ng-click="">
    <div class="guest-list-title">
      <span ng-show="$ctrl.guest.taster.name">{{$ctrl.guest.taster.name}} ({{$ctrl.guest.taster.handle}})</span>
      <span ng-hide="$ctrl.guest.taster.name">{{$ctrl.guest.taster.user.email}}</span>
    </div>
  </a>
  <button class="small-btn"
    ng-click="$ctrl.removeGuest({guest:$ctrl.guest})"
    ng-show="$ctrl.editable">
    <span class="fa fa-minus"></span>
  </button>
`
