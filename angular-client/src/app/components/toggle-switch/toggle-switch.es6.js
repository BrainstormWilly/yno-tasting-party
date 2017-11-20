export const template = `

<button class="toggle-switch-btn-off" ng-click="$ctrl.toggleTrigger({state:false})"><span class="fa fa-circle" ng-class="{'toggle-switch-on':!$ctrl.toggleState}"></span></button>
<button class="toggle-switch-btn-on" ng-click="$ctrl.toggleTrigger({state:true})"><span class="fa fa-circle" ng-class="{'toggle-switch-on':$ctrl.toggleState}"></span></button>
<div class="toggle-switch-title">{{$ctrl.toggleLabel}}</div>

`
