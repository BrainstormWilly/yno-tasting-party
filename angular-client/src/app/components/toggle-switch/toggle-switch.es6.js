export const template = `

<button
  ng-class="$ctrl.toggleStyle"
  ng-click="$ctrl.toggleTrigger()"
  ng-disabled="$ctrl.toggleDisabled">
  <div class="toggle-knob"></div>
</button>
<span ng-if="$ctrl.toggleLabel">{{$ctrl.toggleLabel}}</span>

`
