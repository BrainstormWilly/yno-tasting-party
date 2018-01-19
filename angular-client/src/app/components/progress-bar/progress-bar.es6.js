export const template = `

  <div class="track" ng-style="{width: $ctrl.progress_percent}"></div>
  <span class="label">{{(100*$ctrl.value) | number:0}}%</span>

`
