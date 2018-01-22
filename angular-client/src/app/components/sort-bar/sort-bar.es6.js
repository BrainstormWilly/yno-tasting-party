export const template = `

  <a class="sort-field" href
    ng-repeat="field in $ctrl.fields"
    ng-click="$ctrl.selectAction({field:field})"
    ng-class="{'disabled':field.selected}">
      {{field.name}}
  </a>

`
