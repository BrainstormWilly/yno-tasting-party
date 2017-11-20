export const template = `
<div class="wine-list-item-wrapper">
  <div class="wine-list-item-container">
    <a class="wine-list-item-link" href ng-click="$ctrl.editWine($ctrl.wine)">
      <div class="wine-list-vintage">{{$ctrl.wine.vintage}}</div>
      <div class="wine-list-title">{{$ctrl.wine.name}}</div>
    </a>
    <div class="wine-list-item-buttons" ng-show="$ctrl.editingWine==$ctrl.wine">
      <button class="small-btn" ng-click="$ctrl.editWine($ctrl.wine)"><span class="fa fa-times"></span></button>
      <button class="small-btn" ng-click="$ctrl.removeWine($ctrl.wine)"><span class="fa fa-minus"></span></button>
    </div>
  </div>
</div>
`
