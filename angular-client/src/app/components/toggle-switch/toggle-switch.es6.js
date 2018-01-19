export const template = `

<button ng-click="$ctrl.toggleTrigger()" ng-disabled="$ctrl.toggleDisabled">
  <div class="toggle-knob"></div>
</button>
<span>{{$ctrl.toggleLabel}}</span>

`
