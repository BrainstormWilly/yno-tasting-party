export const template = `
  <h2>Wines reviewed by {{$ctrl.taster.name}}</h2>
  <ul>
    <li ng-show="review.wine" ng-repeat="review in $ctrl.reviews | orderBy: '-rating'">
      Rating: {{review.rating}}. Wine: {{review.wine.full_name}}
    </li>
  </ul>
`
