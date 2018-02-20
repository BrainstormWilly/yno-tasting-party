export const template = `
<a class="tasting-list-item-link" href
  ng-click="$ctrl.selectAction()">
  <div class="tasting-list-item-date"
    ng-class="{'pending':$ctrl.tasting.is_pending, 'open':$ctrl.tasting.is_open, 'closed':$ctrl.tasting.is_closed}">
    <span>{{ $ctrl.tasting.open_at | utcToLocalDate:"MMM-D" }}</span>
    <span>{{ $ctrl.tasting.open_at | utcToLocalDate:"h:mm a" }}</span>
  </div>
  <div class="tasting-list-item-title">
    <span>{{$ctrl.tasting.name}}</span>
    <span><em>- hosted by {{$ctrl.tasting.host.taster.name}}</em></span>
  </div>
</a>
<button class="small-btn"
  ng-click="$ctrl.editTasting()"
  ng-show="$ctrl.editable">
  <span class="fa fa-pencil"></span>
</button>
`
