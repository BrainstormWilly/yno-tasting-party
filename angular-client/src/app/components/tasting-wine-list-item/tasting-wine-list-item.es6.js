export const template = `
  <a class="tasting-wine-list-item-link" href ng-click="$ctrl.editTastingWine({tasting_wine:$ctrl.tastingWine})">
    <div class="tasting-wine-list-vintage">{{$ctrl.tastingWine.wine.vintage}}</div>
    <div class="tasting-wine-list-title">{{$ctrl.tastingWine.wine.name}}</div>
  </a>

  <button class="small-btn"
    ng-click="$ctrl.removeWine({tasting_wine:$ctrl.tastingWine})"
    ng-show="$ctrl.editable">
    <span class="fa fa-minus"></span>
  </button>
`
