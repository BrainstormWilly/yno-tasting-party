export const template = `

<div class="taster-panel-wrapper">
  <a ui-sref='user'>
    <div class="taster-panel-content-left">
      <div class="taster-number" ng-if="$ctrl.tasterNumber>0">{{ $ctrl.tasterNumber }}</div>
      <div ng-if="!$ctrl.tasterNumber"><span class="fas fa-user-circle"></span></div>
    </div>
    <div class="taster-panel-content-right">
      <h3>{{ $ctrl.taster.name }} <span ng-if="$ctrl.tasterIsHost">(Host)</span></h3>
      <p ng-if='$ctrl.taster.handle'>“{{$ctrl.taster.handle}}”</p>
    </div>
  </a>
</div>

`
