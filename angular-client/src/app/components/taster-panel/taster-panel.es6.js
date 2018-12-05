export const template = `


  <a ui-sref='user'>
    <div class="taster-panel-content-left">
      <div class="taster-number" ng-if="$ctrl.tasterNumber>0">{{ $ctrl.tasterNumber }}</div>
      <div ng-if="!$ctrl.tasterNumber"><span class="fas fa-user-circle"></span></div>
    </div>
    <div class="taster-panel-content-right">
      <h4>{{ $ctrl.taster.handle }} <span ng-if="$ctrl.tasterIsHost">(Host)</span></h4>
    </div>
  </a>
  <button ng-click="$ctrl.onToggleTasterMenu()" ng-if="$ctrl.tastingShow"><span class="fas fa-bars"></span></button>


`
