export const template = `
<div class="main-wrapper">
  <h2>Tastings for {{$ctrl.taster.name}}</h2>
  <div class="taster-tastings">
    <a class="taster-tasting-wrapper"
      ng-class="{open: tasting.is_open}"
      ui-sref="tasting({id: tasting.id})"
      ng-repeat="tasting in $ctrl.tastings | orderBy: open_at">
      <div class="name">{{tasting.name}}</div>
      <div class="btn" ng-class="{open: tasting.is_open}">
        <span>{{$ctrl.openDay(tasting)}}</span>
        <span>{{$ctrl.openDate(tasting)}}</span>
        <span>{{$ctrl.openTime(tasting)}}</span>
      </div>
    </a>
  </div>
</div>
  <nav taster="$ctrl.taster"></nav>
`
