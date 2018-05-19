export const template = `
  <a class="wine-list-item-link" href ng-click="$ctrl.selectAction()">
    <div class="wine-list-item-tab" ng-show="$ctrl.wineView=='tastingPending'">
      <span>Price</span>
      <span>{{$ctrl.wineItem.price}}</span>
    </div>
    <div class="wine-list-item-tab" ng-show="$ctrl.wineView=='completed'">
      <span>Wine {{$ctrl.wineItem.wine_number}}</span>
      <span>{{$ctrl.wineItem.average_rating}}</span>
    </div>
    <div class="wine-list-item-tab"
      ng-class="{good:$ctrl.wineItem.rating>3, fair:$ctrl.wineItem.rating==3, bad:$ctrl.wineItem.rating<3}"
      ng-if="$ctrl.wineView=='wines'">
      <span>Rating</span>
      <span>{{$ctrl.wineItem.rating}}</span>
    </div>
    <div class="wine-list-item-tab"
      ng-class="{'unrated':$ctrl.wineItem.unrated}"
      ng-show="$ctrl.wineView=='tasterRating'">
        <span>Wine</span>
        <span>{{$ctrl.wineItem.wine_number}}</span>
    </div>
    <div class="wine-list-item-tab"
      ng-show="$ctrl.wineView=='averageRating'">
        <span>Wine</span>
        <span>{{$ctrl.wineItem.wine_number}}</span>
    </div>
    <div class="wine-list-item-title" ng-show="$ctrl.wineView=='tastingPending'">{{$ctrl.wineItem.wine.full_name}}</div>
    <div class="wine-list-item-title" ng-show="$ctrl.wineView=='wines' || $ctrl.wineView=='completed'">{{$ctrl.wineItem.wine.full_name}}</div>
    <div class="wine-list-item-rating" ng-show="$ctrl.wineView=='averageRating' || ($ctrl.wineView=='tasterRating' && !$ctrl.wineItem.unrated)">
      <div id="wine_{{$ctrl.wineItem.wine_number}}" class="wine-list-item-progress"></div>
      <div class="wine-list-item-rating-number">
          <span class="wine-list-item-rating-integer"></span>
          <span class="fa fa-comment" ng-show="$ctrl.wineItem.comments && $ctrl.wineView=='tasterRating'"></span>
          <span class="fa fa-comment-o" ng-hide="$ctrl.wineItem.comments || $ctrl.wineView=='averageRating'"></span>
      </div>
    </div>


  </a>

  <button class="small-btn"
    ng-click="$ctrl.deleteAction()"
    ng-if="$ctrl.editable">
    <span class="fa fa-minus"></span>
  </button>

  <wait-state wait-on="$ctrl.wineItem.wait"></wait-state>

`
