export const template = `

  <div class="progress-bar" ng-style="{width: $ctrl.progress_percent}"></div>
  <p class="progress-label">{{$ctrl.progress_value | number:0}}% Complete</p>

`
