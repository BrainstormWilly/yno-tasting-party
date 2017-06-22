export const template = `
  <h2>Invites for {{$ctrl.taster.name}}</h2>
  <ul>
    <li ng-repeat="tasting in $ctrl.tastings | orderBy: '-name'">
    {{tasting.name}}
    </li>
  </ul>
`
