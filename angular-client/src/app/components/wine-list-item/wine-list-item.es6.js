export const template = `
  <a class="wine-list-item-link" href ng-click="$ctrl.selectAction()">

    <!--

      TABS

    -->

    <!-- pending tasting view for wines -->
    <div class="wine-list-item-tab" ng-if="$ctrl.wineView=='tastingPending'">
      <span>Price</span>
      <span>\${{$ctrl.wineItem.price}}</span>
    </div>

    <!-- completed tasting view for wines or reveal view -->
    <div class="wine-list-item-tab" ng-if="$ctrl.wineView=='completed' || $ctrl.wineView=='reveal'">
      <span>Wine {{$ctrl.wineItem.wine_number}}</span>
      <span>{{$ctrl.wineItem.average_rating}}</span>
    </div>

    <!-- dashboard review list view -->
    <div class="wine-list-item-tab"
      ng-class="{good:$ctrl.wineItem.rating>3, fair:$ctrl.wineItem.rating==3, bad:$ctrl.wineItem.rating<3}"
      ng-if="$ctrl.wineView=='wines'">
      <span>Rating</span>
      <span>{{$ctrl.wineItem.rating}}</span>
    </div>

    <!-- open tasting view for taster reviews -->
    <div class="wine-list-item-tab"
      ng-class="{'unrated':$ctrl.wineItem.unrated}"
      ng-if="$ctrl.wineView=='tasterRating'">
        <span>Wine</span>
        <span>{{$ctrl.wineItem.wine_number}}</span>
    </div>

    <!-- open tasting view for average reviews -->
    <div class="wine-list-item-tab"
      ng-if="$ctrl.wineView=='averageRating'">
        <span>Wine</span>
        <span>{{$ctrl.wineItem.wine_number}}</span>
    </div>


    <!--

      DESCRIPTIONS

    -->

    <!-- pending tasting view for wines or revealed wine view -->
    <div class="wine-list-item-title" ng-if="$ctrl.wineView=='tastingPending' || ($ctrl.wineView=='reveal' && $ctrl.wineItem.wine)">{{$ctrl.wineItem.wine.full_name}}</div>

    <!-- completed tasting view for wines or dashboard review list view-->
    <div class="wine-list-item-title" ng-if="$ctrl.wineView=='wines' || $ctrl.wineView=='completed'">
      <span>{{$ctrl.wineItem.wine.full_name}}</span>
      <span ng-if="$ctrl.wineView=='completed'"><small>Price: \${{$ctrl.wineItem.price}}</small></span>
    </div>

    <!-- open tasting view for tasting reviews or rated taster reviews -->
    <div class="wine-list-item-rating" ng-show="$ctrl.wineView=='averageRating' || ($ctrl.wineView=='tasterRating' && !$ctrl.wineItem.unrated)">
      <div id="wine_{{$ctrl.wineItem.wine_number}}" class="wine-list-item-progress"></div>
      <div class="wine-list-item-rating-number">
          <span class="wine-list-item-rating-integer"></span>
          <span class="fa fa-comment" ng-show="$ctrl.wineItem.comments && $ctrl.wineView=='tasterRating'"></span>
          <span class="fa fa-comment-o" ng-hide="$ctrl.wineItem.comments || $ctrl.wineView=='averageRating'"></span>
      </div>
    </div>

    <!-- reveal view of unrevealed wine -->
    <div class="wine-list-item-title unrevealed" ng-if="$ctrl.wineView=='reveal' && !$ctrl.wineItem.wine"><span>Unrevealed</span></div>
  </a>

  <button class="small-btn"
    ng-click="$ctrl.deleteAction()"
    ng-if="$ctrl.editable">
    <span class="fa fa-minus"></span>
  </button>


`
