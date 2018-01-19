export const template = `

  <a class="guest-list-item-link" href ng-click="$ctrl.selectAction()">
    <div class="guest-list-item-state" ng-show="$ctrl.guest.confirmed">
      <span>Confirmed</span>
      <span>{{ $ctrl.guest.confirmed | utcToLocalDate:"MMM-DD" }}</span>
    </div>
    <div class="guest-list-item-state invited" ng-hide="$ctrl.guest.confirmed">
      <span>Invited</span>
      <span>{{ $ctrl.guest.invited | utcToLocalDate:"MMM-DD" }}</span>
    </div>
    <div class="guest-list-item-title"><span>{{ $ctrl.handle }}</span></div>
  </a>

  <button class="small-btn"
    ng-click="$ctrl.deleteAction()"
    ng-show="$ctrl.editable">
    <span class="fa fa-minus"></span>
  </button>

`
